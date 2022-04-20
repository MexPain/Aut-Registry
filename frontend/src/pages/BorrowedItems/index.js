import BorrowedItemsTable from "./BorrowedItemsTable";
import {useEffect} from "react";

const BorrowedItemsContent = () => {
    useEffect(() => {
        //TODO check logged in profile and load the stuff
        console.log("TODO check logged in profile and load the stuff, this is a mock list")
    }, [])

    return (
        <>
            <h2>Demo mock list</h2>
            <BorrowedItemsTable />
        </>
    )
}
export default BorrowedItemsContent