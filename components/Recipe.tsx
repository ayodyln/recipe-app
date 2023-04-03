import { useState } from "react"

const Recipe = ({ recipe, recipies, setRecipies }: any) => {
  const [modal, setModal]: any = useState()
  const [fav, setFav] = useState(recipe.fav)
  const [edit, setEdit] = useState(false)

  const favHandler = () => {
    setFav((prev: boolean) => !prev)
    setRecipies((prev: any) => {
      const [_] = prev.filter((r: any) => r.id === recipe.id)
      _.fav = fav
      return [...prev.filter((r: any) => r.id !== recipe.id), _]
    })
  }

  const modalHandler = (e: any) => {
    if (e.target.id === "render" || e.target.id === "close") {
      setModal(!modal)
      setEdit(false)
    }
  }

  const editHandler = (e: any) => {
    setEdit(!edit)

    const recipieCopy = recipies.slice()
    const found = recipieCopy.find(
      (r: { id: number }) => r.id === e.target.id * 1
    )
    found.ingredients = found.ingredients.filter((i: { name: any }) => i.name)

    setRecipies((prev: any) => {
      return prev
    })
  }

  const deleteRecipe = (e: any) => {
    setRecipies((prev: any) => [
      ...prev.filter(
        (r: { id: number }, i: any) => e.target.dataset.id * 1 !== r.id
      ),
    ])
  }

  const newIngredient = (e: any) => {
    const copy = recipies.slice()
    const found = copy.find((r: { id: number }) => r.id === e.target.id * 1)
    found.ingredients = [
      ...found.ingredients,
      { name: "", amount: 0, unit: "unit" },
    ]
    setRecipies([
      ...recipies.filter((r: { id: number }) => r.id !== e.target.id * 1),
      found,
    ])
  }

  const deleteIng = (e: any) => {
    e.stopPropagation()

    setRecipies((prev: any) => {
      const [found] = prev.filter(
        (r: { id: number }, i: any) => r.id === e.target.id * 1
      )
      found.ingredients = found.ingredients.filter(
        (i: any, key: number) => key !== e.target.dataset.id * 1
      )
      return [
        ...prev.filter((r: { id: number }, i: any) => r.id !== e.target.id * 1),
        found,
      ]
    })
  }

  return (
    <>
      <div
        onClick={modalHandler}
        id='render'
        className='cursor-pointer hover:ring bg-primary text-primary-content rounded-lg p-4 shadow-xl flex justify-between items-center'>
        <h2 className='text-4xl font-bold capitalize'>{recipe.name}</h2>

        <button id='favButton' className='w-10' onClick={favHandler}>
          <svg
            className={`w-full ${
              fav ? "fill-secondary" : "fill-current"
            } pointer-events-none`}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'>
            {/* <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
            <path d='M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z' />
          </svg>
        </button>
      </div>

      <div
        id='modal'
        onClick={modalHandler}
        className={`modal ${modal ? "modal-open" : null}`}>
        <div id='modalBox' className='modal-box w-11/12 max-w-5xl'>
          <div className='flex flex-col gap-4'>
            <h2 className='capitalize text-4xl font-bold'>
              {!edit && recipe.name}
              {edit && (
                <input
                  type='text'
                  className='input w-full capitalize input-sm border border-accent'
                  onChange={(e) => {
                    recipe.name = e.target.value
                  }}
                  defaultValue={recipe.name}
                />
              )}
            </h2>

            <div className='border rounded-xl overflow-hidden flex items-center h-80 gap-4'>
              <div className='overflow-auto w-1/2 h-full border'>
                <table className='table w-full'>
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Ingredient</th>
                      <th>Measurment</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {recipe.ingredients.map((i: any, key: any, arr: any[]) => {
                      return (
                        <tr key={key} className=''>
                          <td className='capitalize'>
                            {!edit && i.name}
                            {edit && (
                              <input
                                type='text'
                                data-id={key}
                                defaultValue={i.name}
                                className='input w-full capitalize input-sm border border-accent'
                                onChange={(e) => {
                                  i.name = e.target.value
                                }}
                              />
                            )}
                          </td>

                          <th>
                            {!edit && `${i.amount} ${i.unit}`}
                            {edit && (
                              <div className='flex items-center'>
                                <section className='bg-base-100 rounded-lg w-full border'>
                                  <input
                                    type='number'
                                    className='input w-full border input-xs '
                                    step={0.1}
                                    defaultValue={i.amount}
                                    onChange={(e) => {
                                      i.amount = e.target.value
                                    }}
                                  />

                                  <div className='divider h-0 m-0 my-1'></div>

                                  <select
                                    defaultValue={`${i.unit}`}
                                    className='select select-xs w-full'
                                    onChange={(e) => {
                                      i.unit = e.target.value
                                    }}>
                                    <option value={"unit"} disabled>
                                      Unit
                                    </option>
                                    <option value='L'>litres (L)</option>
                                    <option value={"mL"}>
                                      milliliteres (mL)
                                    </option>
                                    <option value={"g"}>grams (g)</option>
                                    <option value={"kg"}>kilograms (kg)</option>
                                    <option value={"lbs"}>pounds (lbs)</option>
                                  </select>
                                </section>

                                <button
                                  onClick={deleteIng}
                                  id={recipe.id}
                                  data-id={key}
                                  className='btn btn-error ml-4'>
                                  X
                                </button>
                              </div>
                            )}
                          </th>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                {edit && (
                  <button
                    id={recipe.id}
                    onClick={newIngredient}
                    className='btn m-2'>
                    New Ingredient
                  </button>
                )}
              </div>

              <div className='w-1/2 p-1 h-full flex flex-col'>
                <h2 className='text-xl font-bold'>Instructions</h2>

                <div className='divider m-0'></div>

                <section className={`${!edit && "overflow-auto"} h-full flex`}>
                  <div>
                    {!edit &&
                      recipe.instructions
                        .split("\n")
                        .map((str: string, key: number) => {
                          return <p key={key}>{str}</p>
                        })}
                  </div>

                  {edit && (
                    <textarea
                      defaultValue={recipe.instructions}
                      onChange={(e) => (recipe.instructions = e.target.value)}
                      className={`textarea ${
                        edit && "textarea-success"
                      } overflow-auto resize-none w-full h-full`}
                      placeholder='Bio'></textarea>
                  )}
                </section>
              </div>
            </div>
          </div>
          <div className='modal-action'>
            {edit && (
              <button
                data-id={recipe.id}
                onClick={deleteRecipe}
                className='btn btn-error'>
                Delete
              </button>
            )}

            <button
              className={`btn ${!edit ? null : "btn-success"}`}
              id={recipe.id}
              onClick={editHandler}>
              {!edit ? "Edit" : "Save"}
            </button>

            <button
              id='close'
              className={`btn ${edit && "btn-disabled"}`}
              onClick={modalHandler}>
              close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Recipe
