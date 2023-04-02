import { useState } from "react"

const CreateRecipeForm = () => {
  const [ingredients, setIngredients] = useState([])

  return (
    <div className='bg-primary text-primary-content flex flex-col p-2 max-w-md rounded-xl w-1/2'>
      <h2 className='text-xl font-bold mb-4'>Create Recipe</h2>

      <form
        id='createRecipeForm'
        className='flex flex-col justify-between h-full gap-8'
        onSubmit={(event) => {
          event.preventDefault()
          console.log("Submit")
        }}>
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
                className='input w-full text-primary'
              />
            </label>
          </div>

          <div id='ingredients' className='my-4'>
            <h3 className='text-lg font-bold mb-2'>Ingredients</h3>
            <IngredientInput />

            <section className='h-10 mt-5'>
              {ingredients.length === 0 && (
                <p className='opacity-90'>No ingredients added...</p>
              )}

              {ingredients.length > 0 && <p>Oi</p>}
            </section>
          </div>

          <div className='divider before:bg-neutral after:bg-neutral' />

          <div id='instructions' className=''>
            <div className='form-control'>
              <textarea
                className='textarea textarea-bordered h-24 resize-none overflow-auto'
                placeholder='Cooking Instructions'></textarea>
            </div>
          </div>
        </section>

        <input type='submit' value='Create Recipe' className='btn' />
      </form>
    </div>
  )
}

export default CreateRecipeForm

const IngredientInput = () => {
  return (
    <div className='bg-base-300 rounded-lg flex text-neutral w-full'>
      <section className='p-2 w-full flex flex-col gap-2'>
        <div className='form-control'>
          <input
            type='text'
            placeholder='Ingredient'
            className='input input-bordered input-sm w-full'
          />
        </div>

        <div className='bg-base-100 rounded-lg w-full'>
          <input
            type='number'
            className='input w-full border input-xs'
            step={0.1}
            placeholder='0'
          />

          <div className='divider h-0 m-0'></div>

          <select className='select select-xs w-full'>
            <option disabled selected>
              Unit
            </option>
            <option>litres (L)</option>
            <option>milliliteres (mL)</option>
            <option>grams (g)</option>
            <option>kilograms (kg)</option>
            <option>pounds (lbs)</option>
          </select>
        </div>
      </section>

      <button
        type='button'
        className='btn-success w-10 rounded-r-md text-xl hover:bg-[#32C18C]'>
        +
      </button>
    </div>
  )
}
