from pydantic import BaseModel, Field

class SentimentRequest(BaseModel):
    text: str = Field(..., min_length=1, description="Tekst za analizu ne smije biti prazan")

class SentimentResponse(BaseModel):
    text: str
    sentiment: str
    confidence: float