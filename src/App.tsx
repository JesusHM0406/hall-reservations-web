import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import { SidebarOpen } from 'lucide-react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  return (
    <div className='flex min-h-dvh w-full overflow-x-hidden'>
      <Sidebar isSidebarOpen={isSidebarOpen} closeMethod={() => setIsSidebarOpen(false)} />
      <div className='min-w-full'>
        <SidebarOpen onClick={() => setIsSidebarOpen(true)} />
        <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque dignissimos consectetur itaque tempore. Iste, ipsam dolorum odio labore ipsum nulla fugit impedit enim magnam maxime et quod aliquam dicta aspernatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores atque consequatur quisquam a similique magnam placeat quasi fuga reprehenderit eaque suscipit ex vitae, quidem odit eius ratione deleniti iure. Exercitationem. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda, cum ad. Error quam aspernatur doloribus cum, id illum ullam quod, numquam officia corporis nulla vitae? Alias fuga repellat sunt ratione? Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, laboriosam sed autem repellat omnis delectus ipsam aspernatur amet voluptates voluptas ratione harum numquam sequi excepturi eius iusto quis nostrum velit! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat facilis obcaecati molestiae ut, dicta deleniti totam consequuntur distinctio maiores quasi. Veritatis nesciunt nulla aspernatur, omnis nisi eos quos voluptate esse! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod quibusdam odio ipsum. Ea, officia. Reprehenderit, ut. Porro itaque sequi eius doloremque pariatur deleniti, possimus incidunt, earum veritatis laudantium, vitae aliquid? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel, deleniti saepe id dicta tempore sit eveniet porro sunt. Explicabo dolor molestiae nostrum. Nobis, unde. Provident illum ea quis deleniti ullam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas ad doloremque voluptatem. Iste, atque nostrum totam iure a deserunt incidunt corrupti. Reprehenderit saepe dolor similique earum, vitae maiores ad aperiam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio sed nulla distinctio dicta vel, ipsa sapiente tenetur suscipit magni? Minima iusto ad eveniet accusamus expedita quasi soluta! At, totam quae.</span>
      </div>
    </div>
  )
};

export default App;