def get_recommendation(data):
    skin = data.get("skin_type")
    concerns = data.get("concerns", [])
    sun = data.get("sun_exposure")

    result = {}

    # Sunscreen type
    if skin == "oily":
        result["sunscreen"] = "gel / matte"
    elif skin == "dry":
        result["sunscreen"] = "cream"
    else:
        result["sunscreen"] = "mineral"

    # SPF
    if sun == "high":
        result["spf"] = "50+"
    else:
        result["spf"] = "30"

    # Ingredients
    ingredients = []
    if "acne" in concerns:
        ingredients.append("niacinamide")
    if "pigmentation" in concerns:
        ingredients.append("vitamin C")
    if "sensitive" in concerns:
        ingredients.append("zinc oxide")

    result["ingredients"] = ingredients

    result["routine"] = [
        "Cleanser",
        "Moisturizer",
        "Sunscreen"
    ]

    return result