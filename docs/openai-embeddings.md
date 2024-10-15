Embeddings
Get a vector representation of a given input that can be easily consumed by machine learning models and algorithms. Related guide: Embeddings
Create embeddings
POST
 
https://api.openai.com/v1/embeddings
Creates an embedding vector representing the input text.

Request body
input
string or array
Required
Input text to embed, encoded as a string or array of tokens. To embed multiple inputs in a single request, pass an array of strings or array of token arrays. The input must not exceed the max input tokens for the model (8192 tokens for text-embedding-ada-002), cannot be an empty string, and any array must be 2048 dimensions or less. Example Python code for counting tokens.

Show possible types
model
string
Required
ID of the model to use. You can use the List models API to see all of your available models, or see our Model overview for descriptions of them.
encoding_format
string
Optional
Defaults to float
The format to return the embeddings in. Can be either float or base64.
dimensions
integer
Optional
The number of dimensions the resulting output embeddings should have. Only supported in text-embedding-3 and later models.
user
string
Optional
A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. Learn more.
Returns
A list of embedding objects.

Example request
node.js

import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: "The quick brown fox jumped over the lazy dog",
    encoding_format: "float",
  });

  console.log(embedding);
}

main();
Response
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "embedding": [
        0.0023064255,
        -0.009327292,
        .... (1536 floats total for ada-002)
        -0.0028842222,
      ],
      "index": 0
    }
  ],
  "model": "text-embedding-ada-002",
  "usage": {
    "prompt_tokens": 8,
    "total_tokens": 8
  }
}
The embedding object
Represents an embedding vector returned by embedding endpoint.

index
integer
The index of the embedding in the list of embeddings.
embedding
array
The embedding vector, which is a list of floats. The length of vector depends on the model as listed in the embedding guide.
object
string
The object type, which is always "embedding".
The embedding object
{
  "object": "embedding",
  "embedding": [
    0.0023064255,
    -0.009327292,
    .... (1536 floats total for ada-002)
    -0.0028842222,
  ],
  "index": 0
}
