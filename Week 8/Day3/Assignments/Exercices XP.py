                            ##🌟 Exercise 1: Rewrite and Optimize a Vague Prompt
"""
"""
# Step 1: Identify 3 critical issues
# 1. No Target Audience (e.g., remote workers, students).
# 2. Missing format, length, and platform constraints.
# 3. Absence of brand voice and product context (FlowNest).

# Step 2: Optimized Prompt
optimized_prompt = """
Act as an expert Social Media Copywriter. Write a short LinkedIn post promoting our focus app, 
FlowNest, for busy remote professionals. Provide 3 actionable productivity tips using bullet points. 
Keep the tone friendly, professional, and engaging, with a maximum length of 200 words. 
Use this format whenever we promote productivity tools on social media.
"""

                             ##🌟 Exercise 2: Multi-Part Prompt for Quiz Generation  
"""
"""
# Step 1: Complete multi-part prompt
quiz_prompt = """
Act as an expert 7th-grade science curriculum designer. 
Read the attached article on volcanic eruptions and generate educational content structured for Google Slides with the following sections:
1. Summary: Exactly 2 simple bullet points summarizing the article.
2. Quiz: 3 age-appropriate multiple-choice questions. Each question must have 1 correct answer and 2 distractors.
Constraints: Use a friendly tone and simple vocabulary suitable for 11–13-year-olds. 
Format each slide clearly with slide titles.
"""

# Step 2: Comparison against the vague prompt ("Make a quiz for kids about this article.")
# Three key ways this version prevents low-quality output:
# 1. Role Prompting & Target Audience: Specifies 7th-grade science teacher persona and exact age group (11-13) to calibrate tone and vocabulary.
# 2. Strict Structural Constraints: Dictates exact quantities (2 bullet points, 3 MCQs with 1 correct and 2 distractors) rather than an open-ended format.
# 3. Platform Output Control: Enforces a Google Slides-ready layout for immediate practical use.

                               ##🌟 Exercise 3: Add Context, Get Better Results
"""
Scenario: Intern preparing a 3-minute summary for a monthly finance update presentation.
"""

# Task 1: Context Analysis Table
# | Context Type   | Is It Missing? | What Should Be Added?                          |
# | Role           | Yes            | Financial analyst                              |
# | Audience       | Yes            | Non-technical executive team                   |
# | Purpose        | Yes            | 3-minute monthly finance update presentation   |
# | Input Source   | Yes            | Attached monthly financial report              |
# | Format/Style   | Yes            | 3 key takeaways with supporting data           |
# | Constraints    | Yes            | Concise, professional, under 3 minutes         |

# Task 2: Rewritten Optimized Prompt
optimized_prompt = """
Act as a financial analyst. Read the attached monthly financial report and write a concise 3-minute summary for a non-technical executive team. 
Limit the output to 3 key takeaways, each with supporting data from the report. Keep the tone professional and clear.
"""

                            #🌟 Exercise 4: Match Prompt to Purpose 
"""
Scenario: Customer support chatbot prompt template using a Functional style.
"""

# Task 1: Complete Prompt (Functional Style)
support_prompt = """
Act as a customer support assistant for our e-commerce store. 
Review the customer inquiry below and extract these fields into JSON format:
- order_id
- issue_type (e.g., refund, shipping, defective)
- sentiment (positive, neutral, negative)
- recommended_action
Input: "{customer_message}"
"""

# Task 2: Two Key Features of Functional Style
# 1. Precision & Predictability: Executes a specific transformation task without unnecessary conversational filler.
# 2. Structured Output: Forces output into standardized formats (like JSON) for backend processing.

# Task 3: Justification
# Functional style is better than conversational/exploratory here because customer support tickets 
# require precise data extraction, routing accuracy, and consistent API responses over chit-chat.

                               #🌟 Exercise 5: Prompt Refinement Challenge – Control the Style, Structure, and Length
"""
Scenario: Smartwatch product blurb for PulseOne Mini email campaign.
"""

# Task 1: Strict Constraint Prompt
refined_prompt = """
Act as an email copywriter. Write a product blurb for our new smartwatch, PulseOne Mini.
Constraints (Strictly enforce):
- Tone: Friendly and engaging
- Format: Exactly 3 bullet points
- Length: Maximum 50 words total
- Content: Must mention battery life, fitness tracking, and Bluetooth compatibility
"""

# Task 2 & 3: Evaluation & Revision Check
# - Word Count Check: If the model exceeds 50 words, revise with: "Do not exceed 50 words. Count your words."
# - Feature Check: If a feature is missing, enforce with: "List exactly 3 bullet points covering battery life, fitness tracking, and Bluetooth."

                             #🌟 Exercise 6: Hallucination Spotting and Mitigation
"""
Scenario: Summarizing a peer-reviewed article on climate change and marine biodiversity.
"""

# Task 1 & 2: Precise Prompt with Verification Language
anti_hallucination_prompt = """
Act as a precise research assistant. Summarize the attached article on climate change and marine biodiversity. 
Constraints:
- Only include claims explicitly stated in the article.
- If uncertain about any detail, state that the information is not available.
- Do not assume, extrapolate, or introduce outside statistics.
"""

# Task 3: 2 Mitigation Strategies
# 1. Source Grounding: Restricting the model input strictly to the provided text context.
# 2. Explicit Verification Instructions: Forcing fallback phrases ("information not available") when data is missing.

# Task 4: 2 Risky Professional Domains
# 1. Healthcare/Medicine: Fabricating drug dosages or treatment outcomes can cause severe patient harm.
# 2. Legal/Finance: Inventing case law, regulations, or financial figures can lead to compliance failures or liability.