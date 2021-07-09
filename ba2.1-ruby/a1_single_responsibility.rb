# frozen_string_literal: true

# ACTIVITY 2.1 - A1
# TRIANGLE
class Triangle
  def initialize(base, height)
    @base = base
    @height = height
  end

  def area
    bh * 0.5
  end

  def bh
    @base * @height
  end
end

triangle = Triangle.new(12, 5)
puts triangle.area