export function Header(){
    return <div className="navbar navbar-expand-sm navbar-light">
        <div className="container-fluid">
        <div className="">
            <h1 className="company-brand text-danger">NETFLIX</h1>
        </div>
        <div className=" d-flex">
            <button className="btn">
                <select value='English'>
                    <option>English</option>
                    <option>Hindi</option>
                </select>
            </button>
            <button className="btn btn-danger">Sign In</button>
        </div>
        </div>
    </div>
    
}