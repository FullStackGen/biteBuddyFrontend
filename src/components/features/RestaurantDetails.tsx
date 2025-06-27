import { useLocation } from "react-router";
import { Button, Rating, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface RestaurantDetailsProps {
    resData?: any;
    handleEditRestaurantDetails?: () => void;
    handleAddMenuModal?: () => void;
}

const RestaurantDetails = ({
    resData,
    handleEditRestaurantDetails,
    handleAddMenuModal,
}: RestaurantDetailsProps) => {
    const { state } = useLocation();
    const restaurantDetails = resData || state?.restaurantDetails;

    if (!restaurantDetails) return <div>No restaurant details available.</div>;

    return (
        <section className="px-12 py-8">
            <div className="width-full h-full flex justify-between items-baseline">
                <div className="text-2xl font-bold flex gap-2">
                    <div>{restaurantDetails.restaurantName}</div>
                    {handleEditRestaurantDetails && (
                        <Tooltip title="Edit Restaurant Details">
                            <span>
                                <EditIcon
                                    onClick={handleEditRestaurantDetails}
                                    sx={{ width: 16, height: 16, cursor: "pointer" }}
                                />
                            </span>
                        </Tooltip>
                    )}
                </div>
                <div>
                    <Tooltip title="Average User Rating">
                        <span>
                            <Rating
                                value={restaurantDetails.rating ?? null}
                                precision={0.5}
                                readOnly
                            />
                        </span>
                    </Tooltip>
                </div>
            </div>

            <div className="text-gray-600 text-sm">
                {`${restaurantDetails.location}, ${restaurantDetails.state}`}
            </div>
            <div className="mt-2 italic text-gray-500">
                Cuisines: {restaurantDetails.cuisine || "Not specified"}
            </div>
            <div className="mt-8 text-lg font-semibold">Available Menus:</div>
            {!restaurantDetails.menuItems?.length && (
                <div className="text-gray-500">No menu items available.</div>
            )}
            {restaurantDetails.menuItems?.map((item: any, index: number) => (
                <div key={index}>hello</div>
            ))}
            {handleAddMenuModal && (
                <Button
                    onClick={handleAddMenuModal}
                    type="button"
                    variant="text"
                    className="text-xs italic"
                >
                    Add Menu
                </Button>
            )}
        </section>
    );
};

export default RestaurantDetails;
