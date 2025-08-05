# Test suite per il LLM Generator
import unittest
from unittest.mock import Mock, patch, MagicMock
from pathlib import Path
import tempfile
import json
import os

from LLMs_generator_engine.llm_generator import LLMGenerator, LLMConfig, LLMProvider
from LLMs_generator_engine.llm_generator import OllamaAdapter, OpenAIAdapter, GeminiAdapter, AnthropicAdapter

class TestLLMGenerator(unittest.TestCase):
    """Test suite per LLMGenerator"""
    
    def setUp(self):
        """Setup per i test"""
        self.temp_dir = Path(tempfile.mkdtemp())
        self.dataset_dir = self.temp_dir / "dataset"
        self.dataset_dir.mkdir()
        
        # Crea file di esempio
        self.prompt_file = self.temp_dir / "promptV1.txt"
        self.prompt_file.write_text("Test prompt: {code}")
        
        self.dataset_json = self.dataset_dir / "dataset.json"
        test_dataset = {
            "python": [{
                "id": "test1",
                "filename": "test.py",
                "codeSnippetFilePath": "test/code.py",
                "testUnitFilePath": "test/test_unit.py"
            }]
        }
        with open(self.dataset_json, 'w') as f:
            json.dump(test_dataset, f)
        
        # Crea file di codice di esempio
        code_file = self.dataset_dir / "test" / "code.py"
        code_file.parent.mkdir(parents=True)
        code_file.write_text("def test_function():\n    return 42")
    
    def tearDown(self):
        """Cleanup dopo i test"""
        import shutil
        shutil.rmtree(self.temp_dir)
    
    def test_initialization(self):
        """Test inizializzazione LLMGenerator"""
        generator = LLMGenerator(self.temp_dir)
        
        self.assertEqual(generator.base_dir, self.temp_dir)
        self.assertTrue(generator.dataset_dir.exists())
        self.assertIsNotNone(generator.prompt_template)
    
    def test_load_prompt_template(self):
        """Test caricamento template prompt"""
        generator = LLMGenerator(self.temp_dir)
        
        self.assertEqual(generator.prompt_template, "Test prompt: {code}")
    
    def test_get_code_content(self):
        """Test lettura contenuto codice"""
        generator = LLMGenerator(self.temp_dir)
        code_file = self.dataset_dir / "test" / "code.py"
        
        content = generator._get_code_content(code_file)
        
        self.assertEqual(content, "def test_function():\n    return 42")
    
    @patch('llm_generator.OLLAMA_AVAILABLE', True)
    def test_ollama_adapter_available(self):
        """Test disponibilità adapter Ollama"""
        adapter = OllamaAdapter()
        
        self.assertTrue(adapter.is_available())
    
    @patch('llm_generator.OPENAI_AVAILABLE', False)
    def test_openai_adapter_unavailable(self):
        """Test adapter OpenAI non disponibile"""
        adapter = OpenAIAdapter()
        
        self.assertFalse(adapter.is_available())
    
    def test_list_available_models(self):
        """Test lista modelli disponibili"""
        generator = LLMGenerator(self.temp_dir)
        
        models = generator.list_available_models()
        
        self.assertIsInstance(models, dict)
        # Dovrebbe contenere almeno llama3 se Ollama è disponibile
        if 'llama3' in models:
            self.assertIn('ollama:llama3', models['llama3'])

class TestAdapters(unittest.TestCase):
    """Test per gli adapter LLM"""
    
    def test_ollama_adapter_clean_markdown(self):
        """Test pulizia markdown per Ollama"""
        adapter = OllamaAdapter()
        
        code_with_markdown = "```python\ndef test():\n    return 42\n```"
        cleaned = adapter._clean_markdown(code_with_markdown)
        
        self.assertEqual(cleaned, "def test():\n    return 42")
    
    def test_openai_adapter_clean_markdown(self):
        """Test pulizia markdown per OpenAI"""
        adapter = OpenAIAdapter()
        
        code_with_markdown = "```python\ndef test():\n    return 42\n```"
        cleaned = adapter._clean_markdown(code_with_markdown)
        
        self.assertEqual(cleaned, "def test():\n    return 42")

if __name__ == '__main__':
    unittest.main()