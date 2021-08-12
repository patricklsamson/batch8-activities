# CODING EXERCISE 8

def bouncing_ball(height, bounce, window)
  puts(-1) unless (0...1).cover?(bounce)
  bounce_heights = [height]
  bounce_heights << bounce_heights.last * bounce while bounce_heights.last > window
  puts (bounce_heights.size - 1) * 2 - 1
end

bouncing_ball(3, 0.66, 1.5)
bouncing_ball(3, 1, 1.5)
