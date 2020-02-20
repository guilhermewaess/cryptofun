
**1 - How long did you spend on the coding assignment? What would you add to your solution if you had more time? If you didn't spend much time on the coding assignment then use this as an opportunity to explain what you would add**.

Between 6 and 8 hours, as I had a very busy week, it was hard to focus for long periods. 
I’d for sure, think in a better design and improving the user feedback, putting a loading state for example.

**2 - What was the most useful feature that was added to the latest version of your language of choice? Please include a snippet of code that shows how you've used it.**

For react, hooks for sure, in my humble opinion, this increased a lot the react development experience.
For javascript, finally, the Optional Chaining \o/

```
const [apiError, setApiError] = useState('');
const [currentSearch, setCurrentSearch] = useState('');

useEffect(() => {
  getCurrency()
    .then(({ rates }) => setCurrencyRates(rates))
    .catch(error => setApiError(error.message));
}, []);
```

```
if (parsedResponse?.status?.error_code) {
  throw new Error(parsedResponse.status?.error_message as string);
}
```

**3 - How would you track down a performance issue in production? Have you ever had to do this?**

Developer tools are my best friend in these cases, profilers and some other helpers like re-render highlight can save a life. 
Yes, I had performance issues in the past and the chrome tool profiler helped a lot finding the solution.  There were lots of unnecessary loops together with memory leaks, which was easily detectable looking into the call stack and the profiler.

**4 - What was the latest technical book you have read or tech conference you have been to? What did you
learn?**

Not much into books but last technical book that I’ve read was “You don’t know JS”, this one I’ve also made some contributions on translation from English/Portuguese on GitHub :)
I like tech confs, for instance, right now I’m on the interval of VueJs Amsterdam Conference responding this questions :)
But of course last year I’ve attended to a few conferences during the year, the last was ReactLive Amsterdam, where I’ve seen good points in using react native, hooks and how to be a better developer using react.
Also attending meet-ups, the last one was also about React with design systems.

**5 - What do you think about this technical assessment?**
Good assignment, with one or two tricky things behind the scenes (limitation of API and cors error for frontend)

**6 - Please, describe yourself using JSON.**
```
{
  "firstName": "Guilherme",
  "lastName": "Waess da Rocha",
  "height": 170,
  "width": "more than it should :(",
  "hobby": "Djing",
  "age": 29,
  "birthDate": "1990-07-19T19:00:00",
  "description": "nice guy :)"
}
```

