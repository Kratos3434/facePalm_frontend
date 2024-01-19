// "use client"
// // import { ViewPostAtom } from "@/store";
// import { PostProps, UserProps } from "@/type";
// import { useAtom } from "jotai";


// const ViewPost = () => {
//   const [view, setView] = useAtom(ViewPostAtom);

//   return (
//     view.post &&
//     (
//       <div className="tw-fixed tw-top-0 tw-w-full tw-h-full tw-overflow-auto tw-left-0 tw-bg-[rgb(0,0,0)] tw-bg-[rgba(0,0,0,0.4)] tw-py-5 tw-px-[16px] tw-z-[1000]" onClick={() => setView({ status: false, post: null })}>
//         <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-[100vh]">
//           <div className="tw-rounded-md tw-shadow-xl tw-bg-white tw-max-w-[700px] tw-w-full">
//             <div className="tw-relative tw-text-center tw-p-2">
//               <span className="tw-font-bold tw-text-[20px]">
//                 {view.post.author.firstName} {view.post.author.lastName}{"'"}s Post
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   )
// }

// export default ViewPost;