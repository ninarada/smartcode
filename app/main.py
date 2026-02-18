from fastapi import FastAPI, HTTPException
from app.models import SentimentRequest, SentimentResponse
from app.analyzer import analyze_sentiment
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Sentiment Analyzer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

@app.post("/analyze", response_model=SentimentResponse)
async def analyze(request: SentimentRequest):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty") [cite: 34, 90]
    
    sentiment, confidence = analyze_sentiment(request.text)
    
    return {
        "text": request.text,
        "sentiment": sentiment,
        "confidence": confidence
    }