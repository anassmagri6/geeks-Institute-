from text_analyzer import TextAnalyzer

text = "Python is fun and Python is powerful"
analyzer = TextAnalyzer(text)

print(analyzer)                  
print(len(analyzer))             
print(analyzer.word_count())     
print(analyzer.count_word("Python")) 

print("-" * 30)


try:
    empty_analyzer = TextAnalyzer("")
except ValueError as e:
    print(f"Error caught: {e}")

try:
    analyzer.count_word("")
except ValueError as e:
    print(f"Error caught: {e}")