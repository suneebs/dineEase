
'use client';

import { Drawer } from 'vaul';
import { useDrawer } from './DrawerContext';
import { Button } from './ui/button';

export default function VaulDrawer() {
  const { isOpen, closeDrawer,cartItems  } = useDrawer();
  return (
    <Drawer.Root open={isOpen} onOpenChange={closeDrawer}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" onClick={closeDrawer} />
        <Drawer.Content className="bg-gray-100 h-fit fixed bottom-0 left-0 right-0 outline-none">
          <div className="p-4 bg-white">
            <div className='flex justify-end'>
            <Button className="bg-red-500 hover:bg-red-700" onClick={closeDrawer}>X</Button>
            </div>
            <div>
                            {cartItems.length === 0 ? (
                                <p>No items in the cart.</p>
                            ) : (
                                cartItems.map(item => (
                                    <div key={item.id} className="flex justify-between border-b py-2">
                                        <span>{item.title}</span>
                                        <span>₹ {item.rate}</span>
                                    </div>
                                ))
                            )}
                        </div>
            
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

