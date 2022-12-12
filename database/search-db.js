import axios from "axios";
const REQUEST_KEY = "&key=ycxPkCFuLfXARRPLUKtt&secret=SIroYcDpGSwKtmTfsKnOfhPPLzPtlson"
const DISCOGS_DATABSE_API = "https://api.discogs.com/database/search"
const VALID_QUERY_VALUES = ["type","title","release_title","credit","artist","anv","label","genre",
                            "style","country","year","format",
                            "catno","barcode","track","submitter","contributor", "per_page", "page"]
const QUERY_HASHSET = new Set(VALID_QUERY_VALUES)


const searchController = (app) => {
    app.get("/api/search/:SearchParam",searchDB);
    app.get("/api/search/artist/:artist", searchForArtist);
    app.get("/api/search/album/:album", searchForAlbum);
    app.get("/api/search-one/album/:album",searchForAlbumById)
}

const filterDiscogsApiCall = async (qString) =>{
    return await axios.get(
        qString + REQUEST_KEY).then(res => {
        const uniqueIDFilter = new Set();
        const uniqueTitleFilter = new Set();
        return res.data.results.filter(instance => {
            const title = instance.title.split("-")[0]
            if (!uniqueIDFilter.has(instance.master_id) && !uniqueTitleFilter.has(title)) {
                uniqueIDFilter.add(instance.master_id)
                uniqueTitleFilter.add(title)
                return instance
            }
        });
    })
}


const filterAlbums = async (qString) =>{
    return await axios.get(
        qString + REQUEST_KEY).then(res => {
        const uniqueTitleFilter = new Set();
        return res.data.results.filter(instance => {
            const title = instance.title.split("-")[0]
            if (!uniqueTitleFilter.has(title)) {
                uniqueTitleFilter.add(title)
                return instance
            }
        });
    })
}


const filterForAlbumById = async (qString, id) =>{
    return await axios.get(
        qString + REQUEST_KEY).then(res => {
        return res.data.results.find(instance => {
            return instance.id.toString() === id
        })
    })
}


const searchForArtist = async (req, res) => {
    let qString = DISCOGS_DATABSE_API + "?q=" + req.params["artist"]+"&artist="+req.params["artist"];
    console.log(qString)
    const result = await filterDiscogsApiCall(qString);
    res.json(result);
}


const searchForAlbum = async (req, res) => {
    let qString = DISCOGS_DATABSE_API + "?q=" + req.params["album"]+"&release_title="+req.params["album"];
    const result = await filterAlbums(qString);
    res.json(result)
}

const searchForAlbumById = async (req, res) => {
    let qString = DISCOGS_DATABSE_API + "?q=" + req.params["album"]+"&release_title="+req.params["album"];
    const result = await filterForAlbumById(qString,req.query.id);
    res.json(result);
}



/*
Generalized function to query the discogs API for data.

Be aware that param will match ANYTHING in the db not just an artist/album/etc.
If you want to search for only a specific artist make sure to include artist="namehere"
as part of the query.

Query elements should be an element from the list below:
[type,title,release_title,credit,artist,anv,label,genre,style,country,year,format,
catno,barcode,track,submitter,contributor, per_page, page]. This argument is optional.

A well-formed query example would be:
http://localhost:2000/api/search/nirvana?artist=nirvana&year=1991&per_page=2
/nirvana -> path param
?artist=nirvana&year=1991&per_page=2 -> query

More information on the query parameters can be found at:
https://www.discogs.com/developers/#page:database,header:database-search
 */
const searchDB = async (req,res) => {
    const param = req.params["SearchParam"];
    const query = req.query;
    let qString = DISCOGS_DATABSE_API + "?q=" + param;
    for (let key in query) {
        if (!QUERY_HASHSET.has(key) || query[key] === ""){
            console.log("searchDB call failed due to invalid query value or value associated with: "+key)
            res.json({error: "searchDB call failed due to invalid query value: "
                             + "--"+key+ "--  or the value associated with this key was an empty string."})
            return;
        }
        qString += "&" + key + "=" + query[key]
    }

    console.log(qString)
    const result = await filterDiscogsApiCall(qString);
    res.json(result);
}

export default searchController
