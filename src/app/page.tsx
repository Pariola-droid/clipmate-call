'use client';

import { styled } from '@/styles';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ICollection } from './types';

interface State {
  collection: ICollection[];
  loading: boolean;
  error: string | null;
  activeItem: string | null;
  isHovering: string | null;
}

const initialState: State = {
  collection: [],
  loading: true,
  error: null,
  activeItem: null,
  isHovering: null,
};

export default function Home() {
  const [state, setState] = useState<State>(initialState);

  const handleSetState = (newState: Partial<State>) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch('/data/raw.json');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        handleSetState({
          collection: data.data.collections,
          loading: false,
        });
      } catch (err: any) {
        handleSetState({
          error: err.message,
          loading: false,
        });
      }
    };

    fetchCard();
  }, []);

  if (state.loading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div>Error: {state.error}</div>;
  }

  return (
    <StyledContainer>
      <StyledSidebar>
        <SidebarHeader>
          <h2>Collections</h2>
          <SmallText>{state.collection.length} items</SmallText>
        </SidebarHeader>
        <CollectionList>
          <AnimatePresence>
            {state.collection.map((item, index) => (
              <CollectionItem
                key={item.collectionId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
                active={state.activeItem === item.collectionId}
                onClick={() =>
                  handleSetState({ activeItem: item.collectionId })
                }
                onMouseEnter={() =>
                  handleSetState({ isHovering: item.collectionId })
                }
                onMouseLeave={() => handleSetState({ isHovering: null })}
              >
                {state.isHovering === item.collectionId && (
                  <ActiveIndicator layoutId="active-indicator" />
                )}
                <CollectionName>{item.name}</CollectionName>
                <CollectionCount>{item.itemCount || 0} items</CollectionCount>
              </CollectionItem>
            ))}
          </AnimatePresence>
        </CollectionList>
      </StyledSidebar>
    </StyledContainer>
  );
}

const StyledContainer = styled('div', {
  width: '100%',
  height: '100vh',
  display: 'flex',
  backgroundColor: '#f5f5f5',
});

const StyledSidebar = styled('nav', {
  padding: '24px 16px',
  backgroundColor: 'white',
  boxShadow: '1px 0 5px rgba(0, 0, 0, 0.02)',
  position: 'fixed',
  width: '100%',
  maxWidth: 280,
  height: '100vh',
  transition: 'all 0.3s ease',
  borderRight: '1px solid #f0f0f0',
});

const SidebarHeader = styled('div', {
  marginBottom: 16,
  paddingInline: 8,
  paddingBottom: 16,
  flex: 1,
  borderBottom: '1px solid #f0f0f0',

  h2: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#1a1a1a',
    marginBottom: 4,
  },
});

const SmallText = styled('span', {
  fontSize: '0.875rem',
  color: '#666',
});

const CollectionList = styled('ul', {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  overflowY: 'auto',
  height: 'calc(100vh - 50px)',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const ActiveIndicator = styled(motion.div, {
  position: 'absolute',
  inset: 0,
  backgroundColor: '#f0f5ff',
  zIndex: -1,
  borderRadius: 8,
});

const CollectionItem = styled(motion.li, {
  padding: '12px 16px',
  borderRadius: 8,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  marginBottom: 4,
  position: 'relative',

  variants: {
    active: {
      true: {
        backgroundColor: '#f0f5ff',
        '&:hover': {
          backgroundColor: '#e6f0ff',
        },
      },
    },
  },
});

const CollectionName = styled('div', {
  fontSize: '0.975rem',
  fontWeight: 500,
  color: '#2c3e50',
  marginBottom: 4,
  zIndex: 4,
});

const CollectionCount = styled('div', {
  fontSize: '0.75rem',
  color: '#94a3b8',
  zIndex: 4,
});
