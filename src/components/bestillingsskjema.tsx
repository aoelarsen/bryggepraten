import type { JSX } from 'preact/jsx-runtime'
// import utgivelserData from '../constants/utgivelser.json'

// const storage: Storage = localStorage
// const utgivelser = JSON.parse(utgivelserData)

const Bestillingsskjema = () => {
// console.log(utgivelser)
const onSubmit = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
  e.preventDefault()
  console.log('form submitted')
  console.log(e)
}
  return (
    <div>
      <h3>Bestillingsskjema</h3>
      {/* <div>{utgivelserData.utgivelser.bryggepraten.map(bok => {return <span>{bok.tittel}</span>})}</div> */}
      <form onSubmit={(e: JSX.TargetedEvent<HTMLFormElement, Event>) => onSubmit(e)}>
        <button type='submit' />
      </form>
    </div>
    )
}

export default Bestillingsskjema