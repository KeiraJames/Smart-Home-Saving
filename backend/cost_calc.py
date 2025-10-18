def calculate_energy_cost(temp, user_target_temp=22):
    if temp < user_target_temp:
      
        return round((user_target_temp - temp) * 0.5, 2)
    return 0

def calculate_mold_risk(humidity):
    if humidity > 65:
        
        return round((humidity - 65) * 1.0, 2)
    return 0
