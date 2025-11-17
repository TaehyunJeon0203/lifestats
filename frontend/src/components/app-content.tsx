const item = [
    { title: "생존 시간", value: "207,264.4시간" },
    { title: "총 수면 시간", value: "7,884시간" },
    { title: "평균 수면 시간", value: "8시간" },
    { title: "마신 커피", value: "3,650잔" },
];

export function AppContent() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl">
                    {item.map((data) => (
                        <div key={data.title} className="p-4">
                            <h3 className="text-lg font-semibold">{data.title}</h3>
                            <p className="text-2xl">{data.value}</p>
                        </div>
                    ))}
                </div>
                <div className="bg-muted/50 aspect-video rounded-xl"></div>
                <div className="bg-muted/50 aspect-video rounded-xl"></div>
            </div>
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
    );
}