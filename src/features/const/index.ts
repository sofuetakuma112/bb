// Todo: API出来次第消す
const posts = [
  {
    imageUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    imageName: 'minamo',
    profileUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    userId: 'aaa',
    userName: 'minamo',
  },
  {
    imageUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    imageName: 'minamo',
    profileUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    userId: 'aaa',
    userName: 'minamo',
  },
  {
    imageUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    imageName: 'minamo',
    profileUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    userId: 'aaa',
    userName: 'minamo',
  },
  {
    imageUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    imageName: 'minamo',
    profileUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    userId: 'aaa',
    userName: 'minamo',
  },
  {
    imageUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    imageName: 'minamo',
    profileUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    userId: 'aaa',
    userName: 'minamo',
  },
  {
    imageUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    imageName: 'minamo',
    profileUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    userId: 'aaa',
    userName: 'minamo',
  },
  {
    imageUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    imageName: 'minamo',
    profileUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    userId: 'aaa',
    userName: 'minamo',
  },
  {
    imageUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    imageName: 'minamo',
    profileUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    userId: 'aaa',
    userName: 'minamo',
  },
];

const superlikes = [
  {
    imageUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    imageName: 'minamo',
    profileUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    userId: 'aaa',
    userName: 'minamo',
  },
  {
    imageUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    imageName: 'minamo',
    profileUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    userId: 'aaa',
    userName: 'minamo',
  },
  {
    imageUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    imageName: 'minamo',
    profileUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    userId: 'aaa',
    userName: 'minamo',
  },
];

const followers = [
  {
    profileUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    userId: 'aaa',
    userName: 'minamo',
    isFollower: true,
  },
  {
    profileUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    userId: 'aaa',
    userName: 'minamo',
    isFollower: true,
  },
  {
    profileUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    userId: 'aaa',
    userName: 'minamo',
    isFollower: true,
  },
  {
    profileUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    userId: 'aaa',
    userName: 'minamo',
    isFollower: true,
  },
  {
    profileUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    userId: 'aaa',
    userName: 'minamo',
    isFollower: true,
  },
  {
    profileUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    userId: 'aaa',
    userName: 'minamo',
    isFollower: true,
  },
  {
    profileUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    userId: 'aaa',
    userName: 'minamo',
    isFollower: true,
  },
  {
    profileUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
    userId: 'aaa',
    userName: 'minamo',
    isFollower: true,
  },
];

const hashTags = [
  'love',
  'instagood',
  'photooftheday',
  'fashion',
  'beautiful',
  'happy',
  'cute',
  'tbt',
  'like4like',
  'followme',
  'picoftheday',
  'follow',
  'me',
  'selfie',
  'summer',
  'art',
  'instadaily',
  'friends',
  'repost',
  'nature',
  'girl',
  'fun',
  'style',
  'smile',
  'food',
  'instalike',
  'likeforlike',
  'family',
  'travel',
  'fitness',
];

const prompt =
  '<lora:add_detail:1> , ((best quality) ), ((masterpiece) ), ((realistic) ), highres, 8k, Jessica rabbit walking, slim and fit, elegant, ((loose red wet crop top and bikini bottom) ), ((laughing look on face) ), on the beach with clouds and people far in background, Intricate details, lumen reflection, shiny skin, detailed face, (photorealistic)';

const recommendCards = [
  {
    imageUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWTJReU1XSXhNeTFoT0dReUxUUTBNVEF0WWpRMU5TMHpaRE14TjJVNU1tVmpNMkVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--2e681ed58a443b9a9cc70ddf17777314550d402b/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-21f6d0083d3.png',
    name: 'Jessica',
    age: 26,
    profileUrl:
      'https://www.sponichi.co.jp/entertainment/news/2024/02/26/jpeg/20240226s00041000631000p_view.webp',
    userName: 'hamaie',
    userId: 'hama',
    hashTags,
    prompt,
    isSuperLikePost: false,
  },
  {
    imageUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWt6TmpBd05qQmlNaTFpT1dFNUxUUTJNakF0WVdSaVl5MWlNVEZqWm1FMU16RXpNV0lHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--0ae9155437c33ec70be778c4249775ad5ed54afd/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-1f022e6a62d.jpeg',
    name: 'Averil',
    age: 29,
    profileUrl:
      'https://www.sponichi.co.jp/entertainment/news/2024/02/26/jpeg/20240226s00041000631000p_view.webp',
    userName: 'hamaie',
    userId: 'hama',
    hashTags,
    prompt,
    isSuperLikePost: false,
  },
  {
    imageUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWswTUdZellXVTBNUzB5TmpsbUxUUTBNbUV0WW1VNU9TMDBZalZoTUROaE5Ua3laR01HT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--d2b38c03977da24821739e56695181d29c22174f/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-562328d7ac2.png',
    name: 'Jessica',
    age: 19,
    profileUrl:
      'https://www.sponichi.co.jp/entertainment/news/2024/02/26/jpeg/20240226s00041000631000p_view.webp',
    userName: 'hamaie',
    userId: 'hama',
    hashTags,
    prompt,
    isSuperLikePost: false,
  },
  {
    imageUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWs0WVRreVptUmtZUzFqWVdVMkxUUmtNMkV0T1dRM1lTMHhaakkxTW1FNVptRmxNek1HT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--7d2ca0bb5d52f471985249f75648c30cd29fc7fa/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-073a5214714.png',
    name: 'Charlotte',
    age: 22,
    profileUrl:
      'https://www.sponichi.co.jp/entertainment/news/2024/02/26/jpeg/20240226s00041000631000p_view.webp',
    userName: 'hamaie',
    userId: 'hama',
    hashTags,
    prompt,
    isSuperLikePost: false,
  },
  {
    imageUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWszWkRreVkyWXdNeTAzTkRsaUxUUmxPRE10WW1WaVpTMDVOakkwTXpRd09UTTJNbVFHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--bce79533b6fcfe4ba87d4585624e8e78db92c6c3/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-4175c3c8db4.png',
    name: 'Linda',
    age: 29,
    profileUrl:
      'https://www.sponichi.co.jp/entertainment/news/2024/02/26/jpeg/20240226s00041000631000p_view.webp',
    userName: 'hamaie',
    userId: 'hama',
    hashTags,
    prompt,
    isSuperLikePost: false,
  },
];

const followingCards = [
  {
    imageUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWt3WldKaFkyVTBOQzAyT1RKaUxUUmlNemt0T0RrM1lpMHhZMk5qTXpsa05EZ3pNRFVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--5104e2ddec39cfdf007c08303875469f14078884/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-26b6d3837bf.png',
    name: 'Jessica',
    age: 26,
    profileUrl:
      'https://www.sponichi.co.jp/entertainment/news/2024/02/26/jpeg/20240226s00041000631000p_view.webp',
    userName: 'hamaie',
    userId: 'hama',
    hashTags,
    prompt,
    isSuperLikePost: false,
  },
  {
    imageUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWxtWWpJd01qazJNQzFtTXpJeUxUUXdaVE10T1Raa1lTMHdPRGN6TVRNME5qYzJNbVVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--47cc91895b6aae026a58a9eedc8bb486e4b05b22/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-34ff5abd58a.png',
    name: 'Averil',
    age: 29,
    profileUrl:
      'https://www.sponichi.co.jp/entertainment/news/2024/02/26/jpeg/20240226s00041000631000p_view.webp',
    userName: 'hamaie',
    userId: 'hama',
    hashTags,
    prompt,
    isSuperLikePost: true,
  },
  {
    imageUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWt4Tnpaa01XRTVaQzFrTWpGa0xUUTNaR1V0T0dZMVpTMDFaamxpTlRJMk5UbGpPVGdHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--d488f715f1a3c620ad73dbd303aa5ec2d43b8959/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-ebcc6231ec6.png',
    name: 'Jessica',
    age: 19,
    profileUrl:
      'https://www.sponichi.co.jp/entertainment/news/2024/02/26/jpeg/20240226s00041000631000p_view.webp',
    userName: 'hamaie',
    userId: 'hama',
    hashTags,
    prompt,
    isSuperLikePost: true,
  },
  {
    imageUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWxpWkRFeE9EVXdZeTB4T0RSbUxUUmtPVEF0T1RNd05DMWxZamd3WVdaak5UTTFaamNHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--f14a7f23ef9c121a0dbbbac6b3dcf5943c18a608/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-3a87edd6229.jpg',
    name: 'Charlotte',
    age: 22,
    profileUrl:
      'https://www.sponichi.co.jp/entertainment/news/2024/02/26/jpeg/20240226s00041000631000p_view.webp',
    userName: 'hamaie',
    userId: 'hama',
    hashTags,
    prompt,
    isSuperLikePost: false,
  },
  {
    imageUrl:
      'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWxsTVdVMk5qTTFPUzA0TldFMExUUmxPVE10WVRJd1pDMHdNV1UwWXpCaU1qSXdaR1lHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--87a092c925b848906e51886b8a53636a32e68f33/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-08f6365cc1f.png',
    name: 'Linda',
    age: 29,
    profileUrl:
      'https://www.sponichi.co.jp/entertainment/news/2024/02/26/jpeg/20240226s00041000631000p_view.webp',
    userName: 'hamaie',
    userId: 'hama',
    hashTags,
    prompt,
    isSuperLikePost: true,
  },
];

const notifications = [
  {
    id: 0,
    notifier_user: {
      id: 0,
      name: 'takeda',
      icon_image_url:
        'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
      follower_count: 0,
      following_count: 0,
      is_following: true,
      is_followed: true,
      post_count: 0,
      super_like_count: 0,
      created_at: '2024-04-17T13:59:08.256Z',
      updated_at: '2024-04-17T13:59:08.256Z',
    },
    notification_type: 'liked',
    read: true,
    created_at: '2024-04-17T13:59:08.256Z',
    updated_at: '2024-04-17T13:59:08.256Z',
  },
  {
    id: 0,
    notifier_user: {
      id: 0,
      name: 'takeda',
      icon_image_url:
        'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
      follower_count: 0,
      following_count: 0,
      is_following: true,
      is_followed: true,
      post_count: 0,
      super_like_count: 0,
      created_at: '2024-04-17T13:59:08.256Z',
      updated_at: '2024-04-17T13:59:08.256Z',
    },
    notification_type: 'super_liked',
    read: true,
    created_at: '2024-04-17T13:59:08.256Z',
    updated_at: '2024-04-17T13:59:08.256Z',
  },
  {
    id: 0,
    notifier_user: {
      id: 0,
      name: 'takeda',
      icon_image_url:
        'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyWW1Wa1lqaGhOQzB6TUdNeUxUUXpOMkl0WVdVek5pMWtNRFJoTXpBek5qZzFNVEVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e3be356f249b41a90136ba02c86bc52f23682917/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-c861e625c55.png',
      follower_count: 0,
      following_count: 0,
      is_following: true,
      is_followed: true,
      post_count: 0,
      super_like_count: 0,
      created_at: '2024-04-19T02:02:08.256Z',
      updated_at: '2024-04-19T02:02:08.256Z',
    },
    notification_type: 'followed',
    read: true,
    created_at: '2024-04-19T02:02:08.256Z',
    updated_at: '2024-04-19T02:02:08.256Z',
  },
];

export {
  posts,
  superlikes,
  followers,
  hashTags,
  prompt,
  recommendCards,
  followingCards,
  notifications,
};
