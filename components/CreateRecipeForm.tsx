import { useState, useRef, useEffect } from "react"

const CreateRecipeForm = ({ setRecipies, recipies }: any) => {
  const [ingredients, setIngredients]: any = useState([])

  const recipeName: any = useRef()
  const instructions: any = useRef()

  const createRecipeHandler = () => {
    if (
      !recipeName.current.value ||
      !instructions.current.value ||
      ingredients.length < 1
    ) {
      console.error(
        "Please create a Recipe Name, Ingredients, and Instructions"
      )
      return
    }

    setRecipies((prev: any) => {
      return [
        ...prev,
        {
          id: prev.length,
          name: recipeName.current.value,
          ingredients,
          instructions: instructions.current.value,
          fav: false,
        },
      ]
    })
    setIngredients([])
  }

  const removeIngredient = (e: any) => {
    setIngredients((prev: any) => {
      if (prev.length === 1) {
        return []
      } else if (prev.length > 1) {
        return [
          ...prev.filter(
            (i: any, key: number) => key !== e.target.dataset.id * 1
          ),
        ]
      }
    })
  }

  return (
    <div className='bg-primary text-primary-content flex flex-col p-2 max-w-md rounded-xl w-full'>
      <h2 className='text-xl font-bold mb-4'>Create Recipe</h2>

      <div
        id='createRecipeForm'
        className='flex flex-col justify-between h-full gap-8'>
        <section>
          <div className='form-control'>
            <label className='input-group'>
              <span>
                <svg
                  className='w-5 fill-primary'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 448 512'>
                  {/* <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                  <path d='M416 0C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352 240 32c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32V255.6c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16V150.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8V16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z' />
                </svg>
              </span>

              <input
                type='text'
                placeholder='Recipe Name'
                className='input w-full text-neutral'
                ref={recipeName}
              />
            </label>
          </div>

          <div id='ingredients' className='my-4'>
            <h3 className='text-lg font-bold mb-2'>Ingredients</h3>
            <IngredientInput setIngredients={setIngredients} />

            <section className='h-52 mt-5 flex p-2 bg-base-300 rounded-lg flex-col gap-4 overflow-auto'>
              {ingredients.length === 0 && (
                <p className='text-base-content'>No ingredients added...</p>
              )}

              {ingredients.length > 0 &&
                ingredients.map((i: any, key: number) => {
                  return (
                    <div
                      key={key}
                      className='w-full bg-base-100 text-base-content rounded-lg p-4 flex justify-between items-center gap-4 h-fit shadow-lg'>
                      <div>
                        <p>
                          {i.name} - {i.amount} {i.unit}
                        </p>
                      </div>
                      <button
                        data-id={key}
                        onClick={removeIngredient}
                        className='btn btn-circle btn-xs'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-6 w-6 pointer-events-none'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M6 18L18 6M6 6l12 12'
                          />
                        </svg>
                      </button>
                    </div>
                  )
                })}
            </section>
          </div>

          <div className='divider before:bg-neutral after:bg-neutral' />

          <div id='instructions' className=''>
            <div className='form-control'>
              <textarea
                ref={instructions}
                className='textarea textarea-bordered h-56 resize-none overflow-auto text-neutral'
                placeholder='Cooking Instructions'></textarea>
            </div>
          </div>
        </section>

        <button
          type='submit'
          className='btn'
          onClick={() => {
            createRecipeHandler()
            recipeName.current.value = ""
            instructions.current.value = ""
          }}>
          Create Recipe
        </button>
      </div>
    </div>
  )
}

export default CreateRecipeForm

const IngredientInput = ({ setIngredients }: any) => {
  const ingredientName: any = useRef()
  const ingredientAmount: any = useRef()
  const ingredientUnit: any = useRef()

  const createIngredient = async () => {
    setIngredients((prev: any) => {
      return [
        ...prev,
        {
          id: prev.length,
          name: ingredientName.current.value,
          amount: ingredientAmount.current.value,
          unit: ingredientUnit.current.value,
        },
      ]
    })
  }

  return (
    <div className='bg-base-300 rounded-lg flex text-neutral w-full'>
      <section className='p-2 w-full flex flex-col gap-2'>
        <div className='form-control'>
          <input
            type='text'
            placeholder='Ingredient'
            className='input input-bordered input-sm w-full'
            ref={ingredientName}
          />
        </div>

        <div className='bg-base-100 rounded-lg w-full'>
          <input
            type='number'
            className='input w-full border input-xs'
            step={0.1}
            placeholder='0'
            ref={ingredientAmount}
          />

          <div className='divider h-0 m-0'></div>

          <select
            defaultValue={"unit"}
            className='select select-xs w-full'
            ref={ingredientUnit}>
            <option value={"unit"} disabled>
              Unit
            </option>
            <option value='L'>litres (L)</option>
            <option value={"mL"}>milliliteres (mL)</option>
            <option value={"g"}>grams (g)</option>
            <option value={"kg"}>kilograms (kg)</option>
            <option value={"lbs"}>pounds (lbs)</option>
          </select>
        </div>
      </section>

      <button
        onClick={async () => {
          await createIngredient()
          ingredientName.current.value = null
          ingredientAmount.current.value = null
          ingredientUnit.current.value = "unit"
        }}
        type='button'
        className='btn-success w-10 rounded-r-md text-xl hover:bg-[#32C18C]'>
        +
      </button>
    </div>
  )
}
