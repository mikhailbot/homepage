---
title: Exploring Elixir GenServers
date: 2018-01-01
description: Of the many powerful features in Elixir, OTP and GenServers have proven the most interesting.
---
Of the many powerful features in Elixir, OTP and GenServers have proven the most interesting.

OTP, or Open Telecom Platform, is where the Elixir concurrency magic comes from. Battled tested over the years in Erlang, OTP has become a powerful tool in creating resilient and concurrent applications. The simplest way to experience the power of OTP is with Elixir’s GenServers.

GenServers, as described by the great [Elixir School](https://elixirschool.com/en/lessons/advanced/otp-concurrency/), is “a loop that handles one request per iteration passing along an updated state”. The power of this is typically show with a grocery list or a queue of some kind. Instead I experimented with it in a more real world situation: checking whether my servers are up.

The monitoring of server uptime is nothing new, services like [Pingdom](https://www.pingdom.com/) have been around for years and are widely used. The basic premise is you provide a website URL or server IP for them to monitor. If things go down they will notify you so you can react appropriately.

In the original development of this simple application, I used [Quantum](https://github.com/c-rack/quantum-elixir) to run a function on schedule. A list of all the hosts to monitor was created and they would be individually checked to ensure they were online. In practise this works, but it’s awfully rigid and doesn’t have much room to grow. If an error occurred that wasn’t handled correctly a whole bunch of following hosts may not be checked for example.

```
config :pong, Pong.Scheduler,
  jobs: [
    # Ping all hosts every minute
    {"* * * * *", {Pong.Monitors, :check_hosts, []}},

     # Check status of all hosts every minute
    {"* * * * *", {Pong.Reports, :check_status, []}},

    # Remove old checks every hour
    {"5 * * * *", {Pong.Redis, :delete_old_checks, []}}
  ]
```

Enter Elixir GenServers. The second approach was to write a GenServer that would be self contained and represent all the actions required to monitor a host. This way each host I wanted to monitor would get its own GenServer spawned. These GenServers would independently check on their corresponding host. If an issue where to arise for a GenServer, only it would be affected, leaving the rest to continue as they were. An added bonus is that each GenServer can accept a list of options, allowing hosts to following different check schedules or notification options.

```
# Function that initializes the GenServer and its initial state.

def init(initial_state) do
  state = %{
    ip_address: initial_state.ip_address,
    status: initial_state.status,
    latency: 0,
    online_counter: 0,
    offline_counter: 0,
    check_frequency: initial_state.check_frequency
  }

  schedule_work(state.check_frequency)
  {:ok, state}
end

# Handles running the check functions on schedule internally

defp schedule_work(check_frequency) do
  Process.send_after(self(), :work, check_frequency)
end

# On startup add existing hosts into supervision tree

def start_monitoring do
  list_hosts()
  |> Enum.each(fn (host) ->
    Supervisor.start_monitoring_host(host.ip_address, host.status, host.check_frequency)
  end)
end
```

One of the first things I was worried about was what about all these new processes I’m spinning up! Thankfully, that’s were Erlang comes in: “processes in the Erlang VM are lightweight and run across all CPUs. While they may seem like native threads, they’re simpler and it’s not uncommon to have thousands of concurrent processes in an Elixir application.”

To top things off, all these GenServers are in a supervision tree so if one were to fail I could be notified and attempt to restart it automatically.

While it’s not a perfect solution by any means, it’s a start at learning more about Elixirs concurrency and the powerful tools it makes available. If you're interesting in looking at the code in more in-depth it's available on [GitHub](https://github.com/mikhailbot/ping) as well.
