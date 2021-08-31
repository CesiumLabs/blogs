export default function Input({ name, description, placeholder, id }) {
    return (
        <tr>
            <td className="w-1/4">
                <p className="text-xl font-bold">{name}</p>
                <p className="opacity-75 mb-3">{description}</p>
            </td>
            <td>
                <input className="shadow-md border-default border-grey-100 ml-2 px-2 py-1 rounded-default outline-none text-black block w-full" placeholder={placeholder} id={id}/>
            </td>
        </tr>
    )
}