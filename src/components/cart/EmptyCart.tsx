import { Link } from 'react-router-dom';
import empty from "../../assets/images/emptyCart.png";

const EmptyCart: React.FC = () => {
    return (
        <div className="flex items-center flex-col gap-2 m-6">
            <div className="w-52 h-44">
                <img draggable="false" className="w-full h-full object-contain" src={empty} alt="Empty Cart" />
            </div>
            <span className="text-lg">Your cart is empty!</span>
            <p className="text-xs">Add items to it now.</p>
            <Link to="/" className="bg-[#385A64] text-sm text-white px-12 py-2 rounded-sm shadow mt-3">Shop Now</Link>
        </div>
    );
};

export default EmptyCart;
