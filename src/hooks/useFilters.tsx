import { TableData } from "../models/sheetData";

export const useFilters = (data: TableData[]) => {

    function filterRecentCreateDate() {
        const newItems = data.sort((a, b) => new Date(b.created_dt) - new Date(a.created_dt));
        return newItems
    }

    function filterOldestCreateDate() {
        const newItems = data.sort((a, b) => new Date(a.created_dt) - new Date(b.created_dt));
        return newItems
    }

    function filterStatusAuthorized() {
        const newItems = data?.filter(item => {
            const status = item?.operating_status.toLowerCase()
            return status.includes('authorized') && !status.includes("not authorized")
        })
        return newItems
    }

    function filterStatusNotAuthorized() {
        const newItems = data?.filter(item => {
            const status = item?.operating_status.toLowerCase()
            return status.includes('not authorized')
        })
        return newItems
    }

    return { 
        filterOldestCreateDate, 
        filterRecentCreateDate, 
        filterStatusAuthorized, 
        filterStatusNotAuthorized 
    }
}