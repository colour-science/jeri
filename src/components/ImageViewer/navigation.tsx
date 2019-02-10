import * as React from 'react';
import styled from 'styled-components';
import { InputNode } from './index';

const commonPrefix = require('common-prefix');

/** Helper to reverse string */
const reverse = (x: string) => x.split('').reverse().join('');

// tslint:disable
const NavLink = styled.a`
  cursor: pointer;
  display: inline-block;
  margin: 0;
  flex-grow: 0;
  flex-shrink: ${(props: any) => props.active ? '0' : '1'};
  padding: .4em .7em;
  overflow: hidden;
  text-decoration: none;
  white-space: nowrap;
  position: relative;
  background-color: ${(props: any) => props.active ? '#2780e388' : 'inherit'};
  color: ${(props: any) => props.active ? '#000000e6 !important' : '#000000e6 !important'};
  &:active {
    background-color: ${(props: any) => props.active ? '#2780e388' : '#2780e388'};
  }
  &:hover {
    flex-shrink: 0;
  }
  user-select: none;
  -moz-user-select: none;
` as any;
// tslint:enable

const NavRowDiv = styled.div`
  display: block;
  padding: 0;
  border-bottom: 1px solid #dee2e6;
  background: #f8f9fa;
  color: #000000e6;
  display: flex;
  &:first-child {
    border-top: 1px solid #f8f9fa;
  }
  &:hover ${NavLink} {
    flex-shrink: 1;
  }
  &:hover ${NavLink}:hover {
    flex-shrink: 0;
  }
`;

const NavLinkNumber = styled.span`
  color: white;
  font-size: .6em;
  position: absolute;
  top: .3em;
  right: .4em;
`;

export interface NavRowProps {
  row: InputNode;
  active: boolean;       // Is this row currently active for mouse events
  selection: string;     // Title of the selected button
  handleClick: Function;
  removeCommonPrefix: boolean;
}

export const NavRow = ({ row, active, selection, handleClick, removeCommonPrefix }: NavRowProps) => {
  const titlesInRow = row.children.map(child => child.title);

  // Trim common prefices and suffices from the row's entries
  let trimmedTitles: string[];
  if (removeCommonPrefix) {
    const prefix: string = commonPrefix(titlesInRow);
    const suffix: string = reverse(commonPrefix(titlesInRow.map(reverse)));
    trimmedTitles = titlesInRow.map(t => t.slice(prefix.lastIndexOf('/') + 1, t.length - suffix.length));
  } else {
    trimmedTitles = titlesInRow;
  }

  return (
    <NavRowDiv>
      {row.children.map((child, i) => (
        <NavLink
          onClick={() => handleClick(child.title)}
          key={child.title}
          active={child.title === selection}
        >
          {i === 0 ? titlesInRow[i] : trimmedTitles[i]}
          {active && i < 10 ? <NavLinkNumber>{(i + 1) % 10}</NavLinkNumber> : null}
        </NavLink>
      ))}
    </NavRowDiv>
  );
};
