import { getAllListingsRoute } from "./getAllListings";
import { getListingRoute } from "./getListing";
import { addViewToListingRoutes } from "./addViewListing";
import { getUserListingsRoute } from "./getUserListings";
import { createNewListingRoute } from "./createNewListings";
import { updateListingRoute } from "./updateListngs";
import { deleteListingRoute } from "./deleteListings";
import { filesRoutes, staticFilesRoute } from "./files";

export default [
    getAllListingsRoute, 
    getListingRoute, 
    addViewToListingRoutes, 
    getUserListingsRoute,
    createNewListingRoute,
    updateListingRoute,
    deleteListingRoute,
    staticFilesRoute,
    ...filesRoutes ]