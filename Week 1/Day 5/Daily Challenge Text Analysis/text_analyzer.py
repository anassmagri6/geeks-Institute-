class TextAnalyzer:
    def __init__(self, text: str):
        if not text:
            raise ValueError(" empty.")
        self.text = text

    def __str__(self):
        return f"TextAnalyzer object with {self.word_count()} words"

    def __len__(self):
        return len(self.text)

    def word_count(self):
        return len(self.text.split())

    def count_word(self, word: str):
        if not word:
            raise ValueError("empty.")
        
        words = self.text.lower().split()
        return words.count(word.lower())