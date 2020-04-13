def parseData(self, data_s, numberOfArraySlots):
        s_len = len(data_s) # Number of characters in the string
        l = 0 # Index for the data array
        entry = "" # The entry that we are pushing into the array

        if numberOfArraySlots == 2:
            data_arr = ["a", "b"] # Array with 2 placeholders
        elif numberOfArraySlots == 3: 
            data_arr = ["a", "b", "c"] # Array with 3 placeholders 
        elif numberOfArraySlots == 4:
            data_arr = ["a", "b", "c", "d"] # Array with 4 placeholders
        elif numberOfArraySlots == 5:
            data_arr = ["a", "b", "c", "d", "e"] # Array with 5 placeholders
        elif numberOfArraySlots == 6:
            data_arr = ["a", "b", "c", "d", "e", "f"] # Array with 6 placeholders
        elif numberOfArraySlots == 7:
            data_arr = ["a", "b", "c", "d", "e", "f", "g"] # Array with 7 placeholders
        else:
            print("Ungültige Anzahl an Array Slots angegeben!") 
            return "Error"

        for i in range(0, s_len):
            if data_s[i] != ".": # Check for separation character
                entry += data_s[i] # Push character into entry string                
            else:
                data_arr[l] = entry # Push string into array
                entry = "" # Reset entry variable
                l += 1 # Increment "word"-counter

        data_arr[l] = entry # Final push to include last element
        return data_arr         