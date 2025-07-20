"""
Discord Webhook Test Reporter Module

This module provides functionality to send test results to Discord via webhook.
"""

import requests
import json
import time
from datetime import datetime
from typing import Optional, Dict, Any


class DiscordWebhookReporter:
    """
    A class to send test results to Discord via webhook.
    """
    
    def __init__(self, webhook_url: str, username: str = "Test Bot"):
        """
        Initialize the Discord webhook reporter.
        
        Args:
            webhook_url (str): Discord webhook URL
            username (str): Bot username for the webhook messages
        """
        self.webhook_url = webhook_url
        self.username = username
    
   
    
    def _get_embed_color(self, passed_percentage: float, error_percentage: float) -> int:
        """
        Get embed color based on test results.
        
        Args:
            passed_percentage (float): Percentage of passed tests
            error_percentage (float): Percentage of errors
            
        Returns:
            int: Color code for Discord embed
        """
        if error_percentage > 10:
            return 0xFF0000  # Red - High error rate
        elif passed_percentage >= 95:
            return 0x00FF00  # Green - Excellent
        elif passed_percentage >= 80:
            return 0xFFFF00  # Yellow - Good
        elif passed_percentage >= 60:
            return 0xFFA500  # Orange - Moderate
        else:
            return 0xFF0000  # Red - Poor
    
    def _create_embed(self, 
                     test_name: str,
                     duration: str,
                     files_executed: int,
                     total_files: int,
                     tests_passed: int,
                     total_tests: int,
                     errors: int,
                     additional_info: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Create Discord embed for test results.
        
        Args:
            test_name (str): Name of the test
            duration (float): Test duration in seconds
            files_executed (int): Number of files executed
            total_files (int): Total number of files
            tests_passed (int): Number of tests passed
            total_tests (int): Total number of tests
            errors (int): Number of errors
            additional_info (dict, optional): Additional information to include
            
        Returns:
            dict: Discord embed structure
        """
        # Calculate percentages
        files_percentage = (files_executed / total_files * 100) if total_files > 0 else 0
        passed_percentage = (tests_passed / total_tests * 100) if total_tests > 0 else 0
        error_percentage = (errors / total_tests * 100) if total_tests > 0 else 0
        
        # Format duration
        duration_str = duration
        
        # Get embed color
        embed_color = self._get_embed_color(passed_percentage, error_percentage)
        
        # Create embed
        embed = {
            "title": f"🧪 Test Results: {test_name}",
            "color": embed_color,
            "timestamp": datetime.utcnow().isoformat(),
            "fields": [
                {
                    "name": "⏱️ Tempo Impiegato",
                    "value": f"`{duration_str}`",
                    "inline": True
                },
                {
                    "name": "📁 File Eseguiti",
                    "value": f"`{files_executed}/{total_files}` ({files_percentage:.1f}%)",
                    "inline": True
                },
                {
                    "name": "✅ Test Passati",
                    "value": f"`{tests_passed}/{total_tests}` ({passed_percentage:.1f}%)",
                    "inline": True
                },
                {
                    "name": "❌ Errori",
                    "value": f"`{errors}` ({error_percentage:.1f}%)",
                    "inline": True
                }
            ],
            "footer": {
                "text": f"Completed at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
            }
        }
        
        # Add additional fields if provided
        if additional_info:
            for key, value in additional_info.items():
                embed["fields"].append({
                    "name": f"📋 {key}",
                    "value": f"`{value}`",
                    "inline": True
                })
        
        return embed
    
    def send_test_results(self,
                         test_name: str,
                         duration: str,
                         files_executed: int,
                         total_files: int,
                         tests_passed: int,
                         total_tests: int,
                         errors: int,
                         additional_info: Optional[Dict[str, Any]] = None,
                         custom_message: Optional[str] = None) -> bool:
        """
        Send test results to Discord webhook.
        
        Args:
            test_name (str): Name of the test
            duration (str): Test duration string
            files_executed (int): Number of files executed
            total_files (int): Total number of files
            tests_passed (int): Number of tests passed
            total_tests (int): Total number of tests
            errors (int): Number of errors
            additional_info (dict, optional): Additional information to include
            custom_message (str, optional): Custom message to send with embed
            
        Returns:
            bool: True if message sent successfully, False otherwise
        """
        try:
            # Create embed
            embed = self._create_embed(
                test_name=test_name,
                duration=duration,
                files_executed=files_executed,
                total_files=total_files,
                tests_passed=tests_passed,
                total_tests=total_tests,
                errors=errors,
                additional_info=additional_info
            )
            
            # Create payload
            payload = {
                "username": self.username,
                "embeds": [embed]
            }
            
            # Add custom message if provided
            if custom_message:
                payload["content"] = custom_message
            
            # Send webhook
            response = requests.post(
                self.webhook_url,
                json=payload,
                headers={"Content-Type": "application/json"}
            )
            
            response.raise_for_status()
            print(f"✅ Test results sent to Discord successfully!")
            return True
            
        except requests.exceptions.RequestException as e:
            print(f"❌ Error sending Discord webhook: {e}")
            return False
        except Exception as e:
            print(f"❌ Unexpected error: {e}")
            return False
    
    def send_simple_message(self, message: str) -> bool:
        """
        Send a simple text message to Discord.
        
        Args:
            message (str): Message to send
            
        Returns:
            bool: True if message sent successfully, False otherwise
        """
        try:
            payload = {
                "username": self.username,
                "content": message
            }
            
            response = requests.post(
                self.webhook_url,
                json=payload,
                headers={"Content-Type": "application/json"}
            )
            
            response.raise_for_status()
            print(f"✅ Message sent to Discord successfully!")
            return True
            
        except requests.exceptions.RequestException as e:
            print(f"❌ Error sending Discord message: {e}")
            return False


# Context manager per timing automatico
class TestTimer:
    """
    Context manager for automatic test timing.
    """
    
    def __init__(self):
        self.start_time = None
        self.end_time = None
        self.duration = None
    
    def __enter__(self):
        self.start_time = time.time()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.end_time = time.time()
        self.duration = self.end_time - self.start_time
    
    def get_duration(self) -> float:
        """Get the duration of the timed operation."""
        return self.duration if self.duration is not None else 0.0


# Funzioni di utilità
def create_webhook_reporter(webhook_url: str, username: str = "Test Bot") -> DiscordWebhookReporter:
    """
    Create a Discord webhook reporter instance.
    
    Args:
        webhook_url (str): Discord webhook URL
        username (str): Bot username
        
    Returns:
        DiscordWebhookReporter: Configured webhook reporter instance
    """
    return DiscordWebhookReporter(webhook_url, username)


# Esempio di utilizzo
if __name__ == "__main__":
    # Configurazione
    WEBHOOK_URL = "https://discord.com/api/webhooks/1396529284327411857/zm_1miPBBZivw5gWUeXZpixwPdNItX3jaLQXa0rNFLmnXzv95neYStPxBbN6wFkabLen"
    
    # Crea reporter
    reporter = create_webhook_reporter(WEBHOOK_URL, "Test Results Bot")
    
    # Esempio con timer automatico
    with TestTimer() as timer:
        # Simula operazioni di test
        time.sleep(2)
        print("Running tests...")
    
    # Invia risultati
    success = reporter.send_test_results(
        test_name="Unit Tests Suite",
        duration=timer.get_duration(),
        files_executed=45,
        total_files=50,
        tests_passed=42,
        total_tests=50,
        errors=3,
        additional_info={
            "Environment": "Development",
            "Branch": "main",
            "Coverage": "87.5%"
        },
        custom_message="🚀 Daily test run completed!"
    )
    
    if success:
        print("Test results sent successfully!")
    else:
        print("Failed to send test results.")