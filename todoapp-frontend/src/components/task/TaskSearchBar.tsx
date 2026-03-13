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
        <section>
            <input
                type="text"
                value={keyword}
                placeholder="Search task"
                onChange={(event) => onChangeKeyword(event.target.value)}
            />
            <button type="button" onClick={onSearch}>
                Search
            </button>
        </section>
    );
}

export default TaskSearchBar;