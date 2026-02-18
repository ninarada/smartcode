from textblob import TextBlob

def analyze_sentiment(text: str):
    analysis = TextBlob(text)
    score = analysis.sentiment.polarity
    
    if score > 0.1:
        sentiment = "positive"
    elif score < -0.1:
        sentiment = "negative"
    else:
        sentiment = "neutral"
        
    confidence = round(abs(score) if score != 0 else 1.0, 2)
    
    return sentiment, confidence