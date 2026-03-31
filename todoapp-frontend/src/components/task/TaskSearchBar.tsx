import styles from "./TaskSearchBar.module.css";
import Search from "@/assets/icons/Search.svg?react";

interface TaskSearchBarProps {
    keyword: string;
    onChangeKeyword: (value: string) => void;
    onSearch: () => void;
}

function TaskSearchBar({
                           keyword,
                           onChangeKeyword,
                           onSearch,
                       }: TaskSearchBarProps) {
    return (
        <section className={styles.searchBarSection}>
            <div className={styles.searchBarWrapper}>
                <input className={styles.searchBar}
                    type="text"
                    value={keyword}
                    placeholder="Search task..."
                    onChange={(event) => onChangeKeyword(event.target.value)}
                />
                <button className={styles.searchIcon} onClick={onSearch}>
                    <Search className={styles.icon} />
                </button>
            </div>
        </section>
    );
}

export default TaskSearchBar;