from typing import Literal #The tool allows setting allowed values 
from pydantic import BaseModel , ConfigDict

class LibraryResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")
    book_title: str
    book_id : str | None
    status: Literal["available", "unavailable", "not_found", "error"]#I don't want any other value. 
    #If someone writes "maybe" → it will be rejected immediately
    message: str


