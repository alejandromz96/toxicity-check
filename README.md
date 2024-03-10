# Toxicity Check

## Important Note

This is meant to be satire, don't be toxic online.
We are not promoting toxic behaviour online.
If you are toxic online, go outside and seek professional help.

## How toxic are you?

How toxic can you be? Let's find out!

Toxicity Check allows you to perform a timed endurance test in which you will have to write as many toxic responses as you can. Each toxic response will increase your available time and, depending on how toxic are you, will increase your toxicity score.

When the time is up you will be able to see how you did and your most and least toxic response.

## Technologies used

-   [T3 Stack](https://create.t3.gg/)
-   [React](https://react.dev/)
-   [Tensorflow.js](https://www.tensorflow.org/)
-   [Typescript](https://www.typescriptlang.org/)
-   [Tailwindcss](https://tailwindcss.com/)
-   [Heroicons](https://heroicons.com/)

## Assets used

-   [Monogram font](https://datagoblin.itch.io/monogram)

## How it works?

We use one of the pretrained models of Tensorflow.js [toxicity](https://github.com/tensorflow/tfjs-models/tree/master/toxicity) which allows you to check if the sentence is toxic. Also, this model has different categories of toxicity like threat, insult, etc...

The model is loaded on the context of tRPC ( part of the stack of T3 ) and we inference the toxicity of each input by the user.

## About us

-
-
-
