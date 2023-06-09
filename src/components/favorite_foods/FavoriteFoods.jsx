import classes from "./favoritefoods.module.css";
import { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const FavoriteFoods = () => {
  const URL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood";
  const [recipes, setRecipes] = useState([]);
  const [showRecipe, setShowRecipe] = useState(0);

  const handleArrow = (direction) => {
    if (direction === "left") {
      if (showRecipe === 0) {
        setShowRecipe(recipes.length - 1);
      } else {
        setShowRecipe((prev) => prev - 1);
      }
    }
    if (direction === "right") {
      if (showRecipe === recipes.length - 1) {
        setShowRecipe(0);
      } else {
        setShowRecipe((prev) => prev + 1);
      }
    }
  };
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(URL);
        const data = await res.json();
        setRecipes(data.meals.slice(0, 8));
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.title}>
          <h5>Recipes people like the most</h5>
          <h2>Our clients favorite recipes</h2>
        </div>
        <div className={classes.recipes}>
          <AiOutlineArrowLeft
            onClick={() => handleArrow("left")}
            className={classes.leftArrow}
          />
          {recipes?.map((recipe) => (
            <div
              style={{ transform: `translateX(-${showRecipe * 750}px)` }}
              key={recipe.idMeal}
              className={classes.recipe}
            >
              <img src={recipe.strMealThumb} />
              <h3>{recipe?.strMeal}</h3>
            </div>
          ))}
          <AiOutlineArrowRight
            onClick={() => handleArrow("right")}
            className={classes.rightArrow}
          />
        </div>
        <div className={classes.dots}>
          {recipes.map((_, index) => (
            <div
              key={index}
              onClick={() => setShowRecipe(index)}
              className={`${classes.dot} ${
                showRecipe === index && classes.activeDot
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoriteFoods;
