"""Environment fixer - automatically fixes environment/infrastructure issues"""

import logging
import sys
import os
import subprocess
import time
from typing import List, Optional, Tuple

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

from ..core.models import (
    ClassifiedError, FixAttempt, FixAction, FixResult, ErrorCategory
)

logger = logging.getLogger(__name__)


class EnvironmentFixer:
    """
    Automatically fixes environment, Docker, and infrastructure issues.

    KEY RESPONSIBILITIES:
    1. Execute fix actions for fixable error categories
    2. Restart Docker/Colima containers
    3. Clean Docker cache and rebuild containers
    4. Fix file permissions and configurations
    5. Restart metrics collection
    """

    def __init__(self, dry_run: bool = False):
        """
        Initialize environment fixer.

        Args:
            dry_run: If True, only simulate fixes without executing
        """
        self.dry_run = dry_run
        self.stats = {
            'total_fixes_attempted': 0,
            'successful_fixes': 0,
            'failed_fixes': 0,
            'skipped_fixes': 0
        }

    def fix_error(self, error: ClassifiedError) -> List[FixAttempt]:
        """
        Attempt to fix a classified error by executing recommended actions.

        Args:
            error: ClassifiedError to fix

        Returns:
            List of FixAttempt objects documenting what was tried
        """
        if not error.is_fixable:
            logger.warning(
                f"Error {error.anomaly_id} is not fixable (category: {error.category.value})"
            )
            return []

        attempts = []

        # Execute recommended actions in order
        for action in error.recommended_actions:
            attempt = self._execute_fix_action(error, action)
            attempts.append(attempt)

            # Update stats
            self._update_stats(attempt)

            # If action succeeded or was critical failure, may skip remaining actions
            if attempt.result == FixResult.SUCCESS:
                logger.info(
                    f"Fix action {action.value} succeeded for {error.anomaly_id}"
                )
                # Continue with remaining actions for thorough fixing
            elif attempt.result == FixResult.FAILED:
                logger.error(
                    f"Fix action {action.value} failed for {error.anomaly_id}: "
                    f"{attempt.message}"
                )
                # Continue anyway - next action might still work

        return attempts

    def fix_batch(self, errors: List[ClassifiedError]) -> List[FixAttempt]:
        """
        Fix multiple errors in batch.

        Args:
            errors: List of ClassifiedError objects

        Returns:
            List of all FixAttempt objects
        """
        all_attempts = []

        fixable_errors = [e for e in errors if e.is_fixable]

        logger.info(
            f"Starting batch fix for {len(fixable_errors)}/{len(errors)} fixable errors"
        )

        for error in fixable_errors:
            try:
                attempts = self.fix_error(error)
                all_attempts.extend(attempts)
            except Exception as e:
                logger.error(
                    f"Exception fixing error {error.anomaly_id}: {e}",
                    exc_info=True
                )

        logger.info(
            f"Batch fix completed: {len(all_attempts)} fix attempts across "
            f"{len(fixable_errors)} errors"
        )

        return all_attempts

    def _execute_fix_action(
        self,
        error: ClassifiedError,
        action: FixAction
    ) -> FixAttempt:
        """
        Execute a single fix action.

        Args:
            error: ClassifiedError being fixed
            action: FixAction to execute

        Returns:
            FixAttempt documenting the result
        """
        start_time = time.time()

        logger.info(
            f"Executing fix action '{action.value}' for error {error.anomaly_id}"
        )

        # Route to appropriate handler
        if action == FixAction.RESTART_DOCKER:
            result, message = self._restart_docker()

        elif action == FixAction.REBUILD_CONTAINER:
            result, message = self._rebuild_container(error.language)

        elif action == FixAction.CLEAN_DOCKER_CACHE:
            result, message = self._clean_docker_cache()

        elif action == FixAction.FIX_DOCKER_PERMISSIONS:
            result, message = self._fix_docker_permissions()

        elif action == FixAction.RESTART_METRICS_COLLECTION:
            result, message = self._restart_metrics_collection()

        elif action == FixAction.RECALIBRATE_METRICS:
            result, message = self._recalibrate_metrics()

        elif action == FixAction.FIX_PROCESS_MONITORING:
            result, message = self._fix_process_monitoring()

        elif action == FixAction.FIX_FILE_PATHS:
            result, message = self._fix_file_paths(error)

        elif action == FixAction.RESTORE_CONFIG:
            result, message = self._restore_config()

        elif action == FixAction.REGENERATE_CONFIG:
            result, message = self._regenerate_config()

        elif action in [FixAction.RERUN_ENTRY, FixAction.RERUN_WITH_VERBOSE]:
            # These are handled by execution selector, not here
            result = FixResult.SKIPPED
            message = "Re-execution handled by ExecutionSelector"

        elif action in [FixAction.COLLECT_DEBUG_INFO, FixAction.MANUAL_REVIEW_REQUIRED]:
            # These are informational, not actual fixes
            result = FixResult.SKIPPED
            message = "Informational action - no fix attempted"

        else:
            result = FixResult.NOT_APPLICABLE
            message = f"Unknown or unhandled action: {action.value}"

        duration = time.time() - start_time

        attempt = FixAttempt(
            error=error,
            action=action,
            result=result,
            message=message,
            duration_seconds=duration
        )

        return attempt

    # =========================================================================
    # DOCKER FIX METHODS
    # =========================================================================

    def _restart_docker(self) -> Tuple[FixResult, str]:
        """Restart Docker/Colima"""
        if self.dry_run:
            return (FixResult.SUCCESS, "[DRY RUN] Would restart Docker/Colima")

        try:
            # Check if using Colima
            colima_check = subprocess.run(
                ["which", "colima"],
                capture_output=True,
                text=True
            )

            if colima_check.returncode == 0:
                # Using Colima
                logger.info("Restarting Colima...")
                subprocess.run(["colima", "stop"], check=False)
                time.sleep(2)
                subprocess.run(["colima", "start"], check=True)
                return (FixResult.SUCCESS, "Colima restarted successfully")
            else:
                # Using Docker Desktop
                logger.info("Restarting Docker Desktop...")
                # Docker Desktop restart varies by OS
                # For macOS:
                subprocess.run(
                    ["osascript", "-e", 'quit app "Docker"'],
                    check=False
                )
                time.sleep(3)
                subprocess.run(
                    ["open", "-a", "Docker"],
                    check=True
                )
                time.sleep(10)  # Wait for Docker to start
                return (FixResult.SUCCESS, "Docker Desktop restarted successfully")

        except subprocess.CalledProcessError as e:
            return (FixResult.FAILED, f"Failed to restart Docker: {e}")
        except Exception as e:
            return (FixResult.FAILED, f"Error restarting Docker: {e}")

    def _rebuild_container(self, language: str) -> Tuple[FixResult, str]:
        """Rebuild Docker container for specific language"""
        if self.dry_run:
            return (
                FixResult.SUCCESS,
                f"[DRY RUN] Would rebuild Docker container for {language}"
            )

        try:
            # Determine Dockerfile path
            from utility_dir.utility_paths import SRC_DIR
            dockerfile_dir =  SRC_DIR / "docker" / language #os.path.join(SRC_DIR, "docker", language)

            if not os.path.exists(dockerfile_dir):
                return (
                    FixResult.FAILED,
                    f"Dockerfile directory not found: {dockerfile_dir}"
                )

            # Build container
            logger.info(f"Rebuilding Docker container for {language}...")

            image_name = f"test-runner-{language.lower()}"

            result = subprocess.run(
                [
                    "docker", "build",
                    "-t", image_name,
                    "--no-cache",  # Force rebuild
                    dockerfile_dir
                ],
                capture_output=True,
                text=True,
                timeout=300  # 5 minutes max
            )

            if result.returncode == 0:
                return (
                    FixResult.SUCCESS,
                    f"Container {image_name} rebuilt successfully"
                )
            else:
                return (
                    FixResult.FAILED,
                    f"Container rebuild failed: {result.stderr}"
                )

        except subprocess.TimeoutExpired:
            return (FixResult.FAILED, "Container rebuild timed out")
        except Exception as e:
            return (FixResult.FAILED, f"Error rebuilding container: {e}")

    def _clean_docker_cache(self) -> Tuple[FixResult, str]:
        """Clean Docker cache and unused images"""
        if self.dry_run:
            return (FixResult.SUCCESS, "[DRY RUN] Would clean Docker cache")

        try:
            logger.info("Cleaning Docker cache...")

            # Remove stopped containers
            subprocess.run(
                ["docker", "container", "prune", "-f"],
                check=False,
                capture_output=True
            )

            # Remove dangling images
            subprocess.run(
                ["docker", "image", "prune", "-f"],
                check=False,
                capture_output=True
            )

            # Remove build cache
            result = subprocess.run(
                ["docker", "builder", "prune", "-f"],
                capture_output=True,
                text=True,
                check=True
            )

            return (FixResult.SUCCESS, "Docker cache cleaned successfully")

        except subprocess.CalledProcessError as e:
            return (FixResult.FAILED, f"Failed to clean Docker cache: {e}")
        except Exception as e:
            return (FixResult.FAILED, f"Error cleaning Docker cache: {e}")

    def _fix_docker_permissions(self) -> Tuple[FixResult, str]:
        """Fix Docker permission issues"""
        if self.dry_run:
            return (FixResult.SUCCESS, "[DRY RUN] Would fix Docker permissions")

        try:
            logger.info("Fixing Docker permissions...")

            # Add current user to docker group (Linux)
            if sys.platform == "linux":
                subprocess.run(
                    ["sudo", "usermod", "-aG", "docker", os.getenv("USER")],
                    check=False
                )
                return (
                    FixResult.SUCCESS,
                    "User added to docker group - restart shell to apply"
                )
            else:
                return (
                    FixResult.SKIPPED,
                    "Permission fix not needed on this platform"
                )

        except Exception as e:
            return (FixResult.FAILED, f"Error fixing permissions: {e}")

    # =========================================================================
    # METRICS FIX METHODS
    # =========================================================================

    def _restart_metrics_collection(self) -> Tuple[FixResult, str]:
        """Restart metrics collection process"""
        if self.dry_run:
            return (FixResult.SUCCESS, "[DRY RUN] Would restart metrics collection")

        # Metrics collection happens within Docker containers during test execution
        # This is more of a configuration check
        return (
            FixResult.SKIPPED,
            "Metrics collection restart requires re-execution"
        )

    def _recalibrate_metrics(self) -> Tuple[FixResult, str]:
        """Recalibrate metrics collection"""
        if self.dry_run:
            return (FixResult.SUCCESS, "[DRY RUN] Would recalibrate metrics")

        # This would involve checking/adjusting metrics collection scripts
        # Actual implementation depends on metrics collection architecture
        return (
            FixResult.SKIPPED,
            "Metrics recalibration requires manual configuration review"
        )

    def _fix_process_monitoring(self) -> Tuple[FixResult, str]:
        """Fix process monitoring tools"""
        if self.dry_run:
            return (FixResult.SUCCESS, "[DRY RUN] Would fix process monitoring")

        # Check if psutil is available in containers
        # This is more of a verification step
        return (
            FixResult.SKIPPED,
            "Process monitoring fix requires container rebuild"
        )

    # =========================================================================
    # CONFIGURATION FIX METHODS
    # =========================================================================

    def _fix_file_paths(self, error: ClassifiedError) -> Tuple[FixResult, str]:
        """Fix file path issues"""
        if self.dry_run:
            return (FixResult.SUCCESS, "[DRY RUN] Would fix file paths")

        # File path fixes would be very specific to the error
        # Would need to examine actual paths and fix them
        return (
            FixResult.SKIPPED,
            "File path fixes require manual review of specific paths"
        )

    def _restore_config(self) -> Tuple[FixResult, str]:
        """Restore configuration to defaults"""
        if self.dry_run:
            return (FixResult.SUCCESS, "[DRY RUN] Would restore configuration")

        # Would restore config files from backups or defaults
        return (
            FixResult.SKIPPED,
            "Configuration restore requires manual backup verification"
        )

    def _regenerate_config(self) -> Tuple[FixResult, str]:
        """Regenerate configuration files"""
        if self.dry_run:
            return (FixResult.SUCCESS, "[DRY RUN] Would regenerate configuration")

        # Would regenerate config files based on templates
        return (
            FixResult.SKIPPED,
            "Configuration regeneration requires manual template review"
        )

    # =========================================================================
    # UTILITIES
    # =========================================================================

    def _update_stats(self, attempt: FixAttempt):
        """Update internal statistics"""
        self.stats['total_fixes_attempted'] += 1

        if attempt.result == FixResult.SUCCESS:
            self.stats['successful_fixes'] += 1
        elif attempt.result == FixResult.FAILED:
            self.stats['failed_fixes'] += 1
        elif attempt.result == FixResult.SKIPPED:
            self.stats['skipped_fixes'] += 1

    def get_stats(self) -> dict:
        """Get fixer statistics"""
        return self.stats.copy()

    def print_stats(self):
        """Print fixer statistics"""
        print("\n" + "=" * 60)
        print("ENVIRONMENT FIXER STATISTICS")
        print("=" * 60)
        print(f"Total Fixes Attempted:  {self.stats['total_fixes_attempted']}")
        print(f"Successful Fixes:       {self.stats['successful_fixes']}")
        print(f"Failed Fixes:           {self.stats['failed_fixes']}")
        print(f"Skipped Fixes:          {self.stats['skipped_fixes']}")
        print("=" * 60 + "\n")
