---
title: Leveraging Elixir's Enum Module
date: 2018-08-09
description: Sometimes I forget to leverage Elixir’s Enum to it’s fullest. A far more succinct way to count tags for a collection of posts in your blog!
---

I was recently tasked with counting the occurrences of tags for some blog posts. The blog posts where in Markdown with some YAML like frontmatter. I'd already parsed out the front matter and each post had a `tags` property with a string of tags separated by a comma.

My ititial thought was stick it in a GenServer and iterate over the posts using the GenServer's state to keep count of things. I then reasoned that could be done just as simple with an Elixir module as well. Both could work in theory, but neither is great--or leveraging the Elixir language.

Once it was too late to change my mind it hit me--using `Enum.map` and `Enum.reduce` was the obvious answer and far simpler answer! Frustrated I decided to write a quick module to see if I was write (if too late to matter!).

We'll assume we've already parsed all the posts and have them in a nice list with a key `"tags"`.

```elixir
posts = [
  %{"tags" => "Web, Development, WebAssembly, Performance"},
  %{"tags" => "Web, Development"},
  %{"tags" => "Web, Performance"}
]
```

First, we'll clean up our data so that we have a list of just the tags.

```elixir
posts
|> Enum.flat_map(fn x -> [x["tags"]] end)
|> Enum.map(fn x -> String.split(x, ", ") end)
|> List.flatten()

# ["Web", "Development", "WebAssembly", "Performance", "Web", "Development", "Web", "Performance"]
```

Perfect! Now two simple functions will be combined to count the tags. `count/1` uses `Enum.reduce` to go over our list. Initially, I've had issues finding uses for reduce, but once I realized the accumulator could be a simple Map, it opened up a bunch of opportunities. This will iterate over our list of tags, for each one invoke our `update_count/2` function along with the accumulator. After each item in the list it'll store the result of our function back into the accumulator and pass that on to the next item. Once done it'll return our accumulator.

```elixir
def count(tags) do
  Enum.reduce(tags, %{}, &update_count/2)
end
```

The real magic happens in `update_count/2`! We'll take our accumulator and tag, and call `Map.update` on our accumulator. After converting our tag from a string to an atom, we'll either add it to the map if it doesn't exist with a default value of 1, otherwise we'll update the existing value by incrementing it by 1. This way as the same tag keeps showing up we'll keep incrementing it's value in our map.

```elixir
def update_count(tag, acc) do
  Map.update(acc, String.to_atom(tag), 1, &(&1 + 1))
end
```

After all is said and done we get a nice map with the data we need.

```elixir
%{Development: 2, Performance: 2, Web: 3, WebAssembly: 1}
```

I often forget to look at the tools Elixir provides you to solve many problems, `Enum` and `Map` are powerful tools that should be leveraged whenever possible! The cherry on top is this solution is also far more functional in nature, versus a rather procedural approach I first imagined.