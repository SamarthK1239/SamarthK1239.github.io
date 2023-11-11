# OpenAI API Shenanigans

Yep, that's the title. I'm... not entirely sure why, but it was 3 in the morning and my brain was on backup power. Aaaaaanyways, on to the stuff you're actually here for.

## The Idea
Thie project is intended to be long term, essentially evolving in tandem with the OpenAI ecosystem and offerings. Since I started this project with the intention of learning about the API in steps, it has quite a few scripts that function independently. There are more complex projects with multiple scripts on here, and those will have more comprehensive writeups below.

## List of Scripts/Sub-Projects
- [Script](https://github.com/SamarthK1239/OpenAI-Api-Shenanigans/blob/main/OpenAI-API/image_generator.py) Image Generation
- [Script](https://github.com/SamarthK1239/OpenAI-Api-Shenanigans/blob/main/OpenAI-API/image_variation.py) Image Variations
- [Script](https://github.com/SamarthK1239/OpenAI-Api-Shenanigans/blob/main/OpenAI-API/SentimentAnalyzer.py) Sentiment Analysis
- [Sub-Project](https://github.com/SamarthK1239/OpenAI-Api-Shenanigans/tree/main/OpenAI-API/Summarizer) Summarization
- [Sub-Project](https://github.com/SamarthK1239/OpenAI-Api-Shenanigans/tree/main/OpenAI-API/Storyteller) Interactive Storyteller
- [Sub-Project](https://github.com/SamarthK1239/OpenAI-Api-Shenanigans/tree/main/OpenAI-API/EquationSolver) Equation Solver

## General Syntax
While individual projects have their own quirks, there are certain processes that will always use the same structure.

## Imports
You'll need to call this import statement at the beginning of a script that uses _any_ functionality of the API.
``` python
from openai import OpenAI
```

### Initializing an OpenAI object
Once your import's done, you'll need to initialize your OpenAI client. This involves creating a new OpenAI object and giving it your organization and api keys. This looks a little something like this:
``` python
client = OpenAI(
  organization="Organization Key"
  api_key="Api Key"
)
```

### Using Chat Completions
Chat completions are (sort of) new with the latest version of the API. The high level concept is that you give the model a conversation between the system and the user, and let it provide an appropriate continuation of the conversation. There's a couple of quirks with this API call that are important to keep in mind. First off though, here's what a regular call looks like:
```python
response = client.chat.completions.create(params here)
```
Now we can move on to the parameters. The two that are __required__ are the model and the messages. The model is very simple to work with, and involves just a single statement, ```model="gpt-3.5-turbo"```. There's a comprehensive list of available models on the [OpenAI Platform Website](https://platform.openai.com/docs/models).

As for the messages parameter, it's a little more tricky. The model _expects_ a list of dictionaries. Each dictionary is in the form ```{"role":"user/system/assistant/tool", "content":"content goes here"}```. Choosing the right role is important to make sure the model responds appropriately. Since the model needs a _list_ of dictionaries, the messages parameter should look something like this:
``` python
messages = [
  {"role":"user/system/assistant/tool", "content":"content goes here"}
  {"role":"user/system/assistant/tool", "content":"content goes here"}
]
```
It's important to remember that you can always pass a created list to the messages parameter directly, __but__ the inner dictionaries must have the same structure as above for the input to be valid. To finish off, a full chat completion call looks like this:
```python
response = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role":"user/system/assistant/tool", "content":"content goes here"}
    {"role":"user/system/assistant/tool", "content":"content goes here"}
  ]
)
```

To retrieve the text from the response, all you need to run is:
```python
response.choices[0].message.content
```

## Image Generation
This is the first script in this project to use Dall-E. In its current state, it uses ```Dall-E-3``` to create __one__ image with resolution ```1024x1024```. It takes input from the user and creates an image based on it. Prompt design is very important (as it is everywhere else in this project). The more detail you give it, the more likely the model returns an image that you really want.

