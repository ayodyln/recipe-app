import { useState } from "react"

const Recipe = ({ recipe, setRecipies }: any) => {
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
    if (
      e.target.id === "render" ||
      e.target.id === "close"
    ) {
      setModal(!modal)
      setEdit(false)
    }
  }

  const editHandler = () => {
    console.log("edit")
    setEdit(!edit)
  }

  return (
    <>
      <div
        onClick={modalHandler}
        id='render'
        className='bg-primary text-primary-content rounded-lg p-4 shadow-xl flex justify-between items-center'>
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
            <h2 className='capitalize text-4xl font-bold'>{recipe.name}</h2>

            <div className='border rounded-xl overflow-hidden flex items-center h-80 gap-2'>
              <div className='overflow-auto w-2/3 h-full border'>
                <table className='table w-full'>
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Ingredient</th>
                      <th>Measurment</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {recipe.ingredients.map((i: any, key: any) => {
                      return (
                        <tr key={key}>
                          <th>
                            <label>
                              <input type='checkbox' className='checkbox' />
                            </label>
                          </th>

                          <td>{i.name}</td>

                          <th>
                            {i.amount} {i.unit}
                          </th>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className='w-1/3 h-full flex flex-col'>
                <h2 className='text-xl font-bold'>Instructions</h2>

                <div className='divider m-0'></div>

                <section className='overflow-auto h-full'>
                  {recipe.instructions
                    .split("\n")
                    .map((str: string, key: number) => {
                      return <p key={key}>{str}</p>
                    })}
                </section>
              </div>
            </div>
          </div>
          <div className='modal-action'>
            <button className='btn' onClick={editHandler}>
              {!edit ? "Edit" : "Save"}
            </button>

            <button id='close' className={`btn ${edit && 'btn-disabled'}`} onClick={modalHandler}>
              close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Recipe
