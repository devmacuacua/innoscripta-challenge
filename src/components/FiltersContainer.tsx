import TextInput from "./TextInput"
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import DateInput from "./DateInput"
import SelectInput from "./SelectInput"
import Button from "./Button"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { updateFilters } from "../store/preferences/preferencesReducer"

interface FiltersProps {
  keyword: string
  fromDate: string
  toDate: string
  category: string
  author: string
  source: string
  setKeyword: Dispatch<SetStateAction<string>>
  setFromDate: Dispatch<SetStateAction<string>>
  setToDate: Dispatch<SetStateAction<string>>
  setCategory: Dispatch<SetStateAction<string>>
  setAuthor: Dispatch<SetStateAction<string>>
  setSource: Dispatch<SetStateAction<string>>
}

const FiltersContainer: FC<FiltersProps> = ({ keyword, fromDate,
  toDate,
  category,
  author,
  source,
  setKeyword,
  setFromDate,
  setToDate,
  setCategory,
  setAuthor,
  setSource
}) => {
  const categories = useAppSelector((state) => state.newsArticles.categories)
  const sources = useAppSelector((state) => state.newsArticles.sources)
  const authors = useAppSelector((state) => state.newsArticles.authors)

  const dispatch = useAppDispatch()

  const initPersonalizedFilters = async () => {
    const preferencesStr = localStorage.getItem("preferences")
    if (preferencesStr) {
      const preferences = JSON.parse(preferencesStr)
      dispatch(updateFilters({
        keyword: preferences?.keyword,
        fromDate: preferences?.fromDate,
        toDate: preferences?.toDate,
        source: preferences?.source,
        category: preferences?.category,
        author: preferences?.author
      }))
    } else {
      console.log("No preferences found in localStorage")
    }
  }

  useEffect(() => {
    initPersonalizedFilters()
    setKeyword('news')
  }, [])

  const handleFavoriteFilterSave = () => {
    localStorage.setItem("preferences", JSON.stringify({ keyword, fromDate, toDate, source, category, author }))
    dispatch(updateFilters({ keyword, fromDate, toDate, source, category, author }))
  }

  const handleFavoriteFilterReset = () => {
    localStorage.setItem("preferences", "")
    dispatch(updateFilters({ keyword: "", fromDate: "", toDate: "", source: "", category: "", author: "" }))
    clearFilters();
  }

  const clearFilters = () => {
    setFromDate("")
    setToDate("")
    setSource("")
    setCategory("")
    setAuthor("")
  }

  return (
    <div className="filters-container">
      <div className="filters-header">
        <h3>Search & Filters</h3>
      </div>

      <div className="filters-grid">
        <TextInput keyword={keyword} setKeyword={setKeyword} label="Search" />
        <DateInput date={fromDate} setDate={setFromDate} label="From Date" />
        <DateInput date={toDate} setDate={setToDate} label="To Date" />
        <SelectInput values={categories} value={category} setValue={setCategory} label="Category" />
        <SelectInput values={authors} value={author} setValue={setAuthor} label="Author" />
        <SelectInput values={sources} value={source} setValue={setSource} label="Source" />
        <div className="filter-actions">
          <Button label="Save as preferred" handleOnClick={handleFavoriteFilterSave} />
          <Button label="Reset preferences" handleOnClick={handleFavoriteFilterReset} />
        </div>
      </div>
    </div>

  )
}

export default FiltersContainer