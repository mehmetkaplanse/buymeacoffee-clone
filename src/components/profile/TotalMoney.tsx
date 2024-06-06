import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const TotalMoney = ({totalMoney}: {totalMoney: number}) => {
  return (
    <div className="bg-yellow-300/20 border-2 border-yellow-300 p-4 rounded-xl flex items-center justify-between gap-2 mt-4">
    <div className="flex items-center gap-2">
      Total money received:{" "}
      <span className="text-2xl font-semibold">${totalMoney}</span>
    </div>
    <a
    className="bg-yellow-300 px-4 py-2 rounded-lg flex items-center gap-2" 
    href="mailto:payout@bmac.io">
      Request a payout
      <FontAwesomeIcon icon={faArrowRight} />
    </a>
  </div>
  )
}

export default TotalMoney