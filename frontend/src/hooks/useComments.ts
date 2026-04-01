import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createComment, deleteComment } from '../lib/api'
import type { CreateComment } from '../types/comment'

// create comment
const useCreateComment  = () => {
  const  queryClient = useQueryClient() // this only for to re render tanstack cache after mutuation
  return useMutation({
    mutationFn : ({productId,content}:CreateComment) => createComment(productId,content),
    onSuccess(_, variables) {
      queryClient.invalidateQueries({queryKey:["product",variables.productId]})
    },
  })
}
// delete comment
const useDeleteComment  = (productId: string) => {
  const  queryClient = useQueryClient()
  return useMutation({
    mutationFn : (commentId:string) => deleteComment(commentId),
    onSuccess() {
      queryClient.invalidateQueries({queryKey:["product",productId]})
    },
  })
}

export {useCreateComment , useDeleteComment} 


