import { Anchor } from "@mantine/core"

export const breadcrumberfy = crumbs => {
    return crumbs.map((item, index) => (
        <Anchor
            key={index}
            onClick={item.link ? () => route.push(item.link) : undefined }>
            {item.title}
        </Anchor>
    ))
}

export const backendAsset = file => {
    let backend = process.env.NEXT_PUBLIC_BACKEND_URL

    return `${backend}/storage/${file}`
}