# CODING EXERCISE 8

def centuryFromYear(year)
  century = year.to_f / 100
  p century > century.round ? century.round + 1 : century.round
end

centuryFromYear(1705)
centuryFromYear(1900)
centuryFromYear(1601)
centuryFromYear(2000)
