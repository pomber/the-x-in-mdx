```srt
1.9 –> 6.8
Here we have a Markdown file
6.6 –> 12
Markdown has this clean syntax that
makes you want to use it for everything
12 –> 17.1
And that's also why we have MDX,
now we can put more things on Markdown
31.4 –> 34
In this talk,
we are going to see how flexible MDX is
34 –> 39
And how to use it for any kind of content
and any kind of layout
```

```srt
0.3 –> 3.7
But first I need to show you how this works
3.7 –> 7.9
We have a small Next.js App
that has the MDX plugin
8 –> 14
and we have a page that imports
the markdown file
```

```srt
0.2 -> 3.9
The real magic happens on this import
3.9 -> 11.5
Here the MDX loader transforms the markdown
into a React component
11.5 -> 17
And the page just renders that component
```

```srt
0.2 -> 6.5
If we want to change what's rendered,
we can use the MDXProvider
6.5 -> 13.7
It has a prop that let us override
any of the default components
13.7 -> 20
For example, here we are adding
a purple border to all H1s
```

```srt
1.5 -> 5.1
A special component we can override
is the Wrapper
5.1 -> 16.5
The wrapper is the component
that wraps the content
16.5 -> 20.5
You can see how we're using it to add
a border around the whole content
16.5 -> 20.5
But the cool thing about this component
is that in the children prop
20.5 -> 26.3
we get all the content from
the markdown file as React elements
```

```srt
0.3 -> 3.9
and React elements
are just javascript objects
3.9 -> 8.2
Here we are rendering
the wrapper children as JSON
8.2 -> 11.8
We are only showing some of the properties
8.2 -> 11.8
I hope you can see
what the JSON looks like
16.4 -> 20.45
It's an array
20.45 -> 24.4
the first element is an h1,
the second a paragraph
24.4 -> 28.5
Each element comes with an mdxType
28.5 -> 34.5
We can, and we will, use that mdxType to
extract information about the content
```

```srt
0 -> 1.5
For example
1.5 -> 5.5
we could get a list of all the H1s
from the children,
5.5 -> 9.5
and render it as a table of contents
This is a very simple example,
9.5 -> 12.7
but it shows the pattern we are going
to use on the rest of the examples
17.3 -> 21
In all of them, we'll have two steps
17.3 -> 21
First, we extract some data
from the children
21 -> 24.7
and then we pass that data
to some layout component
24.7 -> 27.7
Keep in mind that this runs on every render
27.7 -> 31.3
In most cases,
it isn't a performance problem
31.3 -> 37.7
but if it is, you can move it to a plugin,
and run the transformation on build-time
```

```srt
1 -> 4.3
I usually write content that has steps
like tutorials or any type of walkthrough
10.7 -> 16.3
Markdown doesn't have any specific syntax
for grouping things in steps
16.3 -> 23.7
But we can use MDX to extend Markdown
and make up our syntax
23.7 -> 28.1
The implementation of the Step component
we are using here doesn't matter
28.1 -> 31.8
we are just using it for grouping elements
31.8 -> 35.2
If you are new to MDX,
this may not be the best introduction
35.2 -> 40
MDX is typically used for embedding
interactive components in Markdown
40 -> 42.7
But here we are taking a different approach
42.7 -> 47.68
and using it more
as a syntax extension for markdown
```

```srt
0 -> 5.9
Now, based on the MDX file that has steps,
we can write another Wrapper component
5.9 -> 12
In this case, the children prop will be
an array of Step elements
12 -> 16.4
So we can keep track of
what step we are showing using React state
16.4 -> 21
and let the user change the current step
by clicking a button
25 -> 30.4
Ok, now I want to show the same content
but with a different layout
30.4 -> 36.4
There's a technique called scrollytelling,
you may have seen it on some websites
36.4 -> 42
as the user scrolls down there's some
part of the layout that sticks to the screen
42 -> 45.1
while the rest is scrolled away
45.1 -> 47
Let's do that
```

```srt
0 -> 7
Since this is a lightning talk
I won't show the code of the Layout component
7 -> 12.5
I'll share the link to the repo later
if you want to see how it works
12.5 -> 17.2
The ScrollytellingLayout component
takes two props
17.2 -> 23.8
one for the left-side that can be scrolled,
and another for the sticky part on the right
23.8 -> 27.2
When the user scrolls to a new step
27.2 -> 30.4
we show the corresponding element
from the sticker list
36.2 -> 44
which, for now, it's just the step number
36.2 -> 44
But let's change it so it shows something
from the MDX file
```

```srt
2.8 -> 7.5
Suppose we want to show some code
in the sticky part of the layout
7.5 -> 14
Since there isn't any specific syntax
for this, we'll make up our own
14 -> 19
For example, we put the sticky part
as the first element in the Step
```

```srt
0.8 -> 3.8
Now, doing some array transformations
3.8 -> 10.2
We extract the list of steps
and the list of stickers
10.2 -> 12.5
and then pass them
to the same Layout component
13.5 -> 15
So now the code on the right
13.5 -> 15
should change as the user scrolls
to a different step
```

```srt
1 -> 7.5
Just for fun, I have a Terminal component
that animates code transitions
7.5 -> 10
so we can use it for the stickers
and let it handle the step changes
21.7 -> 25.4
For the next example, let's add some media
25.4 -> 30.2
Instead of changing the steps
using the scroll
30.2 -> 38.1
we can synchronize the steps with something
like a video or audio,
28.1 -> 43
and change the steps as the media progress
```

```srt
0.6 -> 3
To do that,
we'll change the MDX
3 -> 9
we need to specify the media file
and the time range for each step
```

```srt
0.6 -> 8
Once we have that, we can extract it
from the children on the Wrapper
8 -> 10.2
and pass it to another React component
10.2 -> 18
this time is the TalkLayout component,
that will solve all the synching for us
18 -> 23
Now you should see the steps changing
every time I snap my fingers
26.3 -> 32.1
Some of you may have noticed that this
looks similar to the layout of this talk
32.1 -> 34.1
the talk I'm giving right now
34.1 -> 37
and it is
```

```srt
0.7 -> 4.4
This talk was built using this same technique
4.4 -> 7.3
It's all MDX
Always has been
7.3 -> 9.7
On the left, you can see the MDX for
this specific step of the talk
```

```srt
0 -> 4
And here is the next one
We have four different elements for each step
0 -> 4
We have the video filename and timestamps
the url we are showing on the iframe
0 -> 4
information for the code we are highlighting
and even the captions for the step
```

```srt
1.5 -> 4.2
And, that's all, that's my talk
So, what's the takeaway?
4.2 -> 12.8
Well, don't be afraid to use MDX
for something different
4.2 -> 12.8
You can use it to make your own dialect
for almost any kind of content or layout
12.8 -> 16.2
I leave you here the links
to the repo of the talk
16.2 -> 18
not the slides
but the talk itself
18 -> 22.7
you run yarn dev
and you can watch this talk again
22.7 -> 26.7
Also, there's my twitter,
and the components we used
26.7 -> 29.5
Most of them come
from a new project I'm working on
29.5 -> 34.5
Code Hike, it's a set of tools
to make code walkthroughs
34.5 -> 40
or explaining code in general
40 -> 42
Thank you! :)
```
