# CODING EXERCISE 7
def disemvowel(string)
  vowels = 'aeiouAEIOU'

  puts (string.chars - vowels.chars).join
end

disemvowel('This website is for losers LOL!')
