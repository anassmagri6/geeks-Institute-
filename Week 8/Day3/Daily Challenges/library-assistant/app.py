
import os
import json
from dotenv import load_dotenv
from openai import OpenAI
from schemas import LibraryResponse
from tools import find_book, check_availability 
load_dotenv()

api_key = os.getenv("API_KEY")
if not api_key or api_key == "API_KEY_NVIDIA_KEY_HERE":
    raise RuntimeError("API_KEY environment variable is not set. Please set it in your .env file.")

client = OpenAI(
    base_url="https://api.openai.com/v1",
    api_key=api_key,
    timeout=60,
    max_retries=0,
)

find_book_tool = {# Descriptive definition of the tool Not the code that performs the search
    "type": "function",
    "function": {
        "name": "find_book",
        "description": "Find a library book using its title.",#When do we use the tool?
        "parameters": {
            "type": "object",
            "properties": {"title": {"type": "string"}},
            "required": ["title"],
            "additionalProperties": False,#Sending undefined transactions is prohibited  
        
        },
    },
}
check_availability_tool = {
    "type": "function",
    "function": {
        "name": "check_availability",
        "description": "Check book availability using its book_id.",
        "parameters": {#Properties that can be sent
            "type": "object",
            "properties": {"book_id": {"type": "string"}},
            "required": ["book_id"],
            "additionalProperties": False,
        },
    },
}

def min ():
    user_enter = input("Student request: ").strip().lower()
    if not user_enter:
        print("No request provided.")
        return
    messages =[{"role": "user", "content": user_enter}]

    # Stage A: Find the Book
    print("\n[1/2] Calling find_book...")
    response =client.chat.completions.create(
        model=os.environ["MODEL"],
        messages=messages,
        tools=[find_book_tool],
        tool_choice={"type": "function", "function": {"name": "find_book"}},
        max_tokens=1024,   
    )

    message = response.choices[0].message
    if not message.tool_calls:#The command the form asks of your code is not a user's answer
        print("No response from find_book.")
        return
    tool_call = message.tool_calls[0]
    args = json.load(tool_call.function.arguments)#Convert form request from text to (title = "Python Basics")
    #usable data
    title  = args.get('title')

# Append assistant message with tool call
    messages.append({
        "role": "assistant",
        "tool_calls": [{
            "id": tool_call.id,
            "type": "function",
            "function": {
                "name": tool_call.function.name,
                "arguments": tool_call.function.arguments
            }
        }]
    })
# Execute find_book
    find_result_str = find_book(title)
    find_result = json.loads(find_result_str)
    messages.append({
        "role": "tool",
        "tool_call_id": tool_call.id,
        "content":find_result_str
    })
    book_id = find_result.get('book_id')

# Stage B: Check Availability (if book found)
    if find_result.get('found') and book_id:
        print(f"[2/2] Book found (ID: {book_id}). Calling check_availability...")
        response2 = client.chat.completions.create(
            model=os.environ["MODEL"],
            messages=messages,
            tools=[check_availability_tool],
            tool_choice={"type": "function", "function": {"name": "check_availability"}},
            max_tokens=1024,
        )

        message2 = response2.choices[0].message
        if message2.tool_calls:
            tool_call2 = message2.tool_calls[0]
            args2 = json.loads(tool_call2.function.arguments)
            requested_id = args2.get('book_id')
            
# Validate that proposed ID matches actual found ID
        if requested_id == book_id: #(requested_id) from Model (Artificial Intelligence) — What he asked for in
                messages.append({
                    "role": "assistant",
                    "tool_calls": [{
                        "id": tool_call2.id,
                        "type": "function",
                        "function": {
                            "name": tool_call2.function.name,
                            "arguments": tool_call2.function.arguments
                        }
                    }]
                })
        avail_result_str = check_availability(requested_id)
        messages.append({
                    "role": "tool",
                    "tool_call_id": tool_call2.id,
                    "content": avail_result_str
                })
    else:
         print("Warning: Model requested mismatched book_id. Skipping availability check.")

# Generate Structured Final Answer
    print("\nGenerating final structured answer...")
    final_response = client.beta.chat.completions.parse(
        model=os.environ["MODEL"],
        messages=messages,
        response_format=LibraryResponse,
        max_tokens=2048,   
    )
    final_msg = final_response.choices[0].message
    if final_msg.refusal:#The form refused to answer (for ethical/security reasons)
        raise ValueError("Model refused the request. Please try again.")

    result = final_msg.parsed#hold information from the model
    print("\n--- Final Structured Output ---")
  
    if result is None:
        raise ValueError("Model did not return a valid response. Please try again.")

    print("\n--- Final Structured Output ---")
    print(result.model_dump_json(indent=2))##Convert the result object to JSON text.


if __name__ == "__main__":

     
 min()
   

    



            

        
    
  
      




