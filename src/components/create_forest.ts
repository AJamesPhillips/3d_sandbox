import { AbstractMesh, Scene, ShadowGenerator, Vector3 } from "@babylonjs/core"
import { create_tree, Tree } from "./create_tree"



export function create_forest (scene: Scene, shadow_generator: ShadowGenerator, position: Vector3, size: number)
{
    const tree_nodes: AbstractMesh[] = []
    const trees_with_delays: { tree: Tree, delay: number }[] = []

    let i = 0
    while (i < size)
    {
        let j = 0
        while (j < size)
        {
            const x = (i * 3) + (Math.random() * 2)
            const z = (j * 3) + (Math.random() * 2)
            const pos = position.add(new Vector3(x, 0, z))
            const tree = create_tree(scene, shadow_generator, pos, `${i}_${j}`)

            const s = 0.5 + (Math.sin(Math.random() * Math.PI) * 0.7)
            const scale = Vector3.One().scale(s)
            tree.node.getChildMeshes().forEach(mesh => mesh.scaling = scale)
            tree_nodes.push(tree.node)

            const progress = (i + j) / ((size - 1) * 2)
            const inv_progress = 1 - progress
            const d = Math.sin(inv_progress * (Math.PI / 2))
            const delay = (d * 10 + Math.random() * inv_progress) * 200
            trees_with_delays.push({ tree, delay })
            ++j
        }
        ++i
    }


    function play ()
    {
        trees_with_delays.forEach(({ tree, delay }) =>
        {
            setTimeout(() => tree.play(), delay)
        })
    }


    return {
        tree_nodes,
        play,
    }
}
