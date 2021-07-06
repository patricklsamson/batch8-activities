# frozen_string_literal: true

# ACTIVITY 1 - A3
contact_data = [['ana@email.com', '123 Main st.', '555-123-4567'],
                ['avion@email.com', '404 Not Found Dr.', '123-234-3454']]

contacts = { 'Analyn Cajocson' => {}, 'Avion School' => {} }

i = 0

contacts.each do |key, _value|
  contacts[key] = {
    email: contact_data[i][0],
    address: contact_data[i][1],
    phone: contact_data[i][2]
  }

  i += 1
end

puts contacts
