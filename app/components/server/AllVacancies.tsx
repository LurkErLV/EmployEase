export default async function AllVacancies() {
    const res = await fetch(`${process.env.BASE_PATH}/api/vacancy/getAll`);
    const data = (await res.json()).allVacancies;
    console.log(data)

    return (
        <>
            <div className="w-full grid grid-cols-3 grid-rows-5 gap-6">
                {data && data.map((item: any) => (
                    <div className="max-w-[425px] w-full border-2 border-[#E4E5E8] rounded bg-white" key={item.id}>
                        <p>{item.title}</p>
                    </div>
                ))}
            </div>
        </>
    );
}